#!/usr/bin/env python3
"""Export every tracked text file in this repository into one searchable PDF."""
from pathlib import Path
import subprocess
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_RIGHT, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Preformatted, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "Pdf-Complete-Repository.pdf"
font_candidates = [
    Path("/usr/share/fonts/truetype/noto/NotoNaskhArabic-Regular.ttf"),
    Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
]
font_path = next((p for p in font_candidates if p.exists()), None)
if font_path:
    pdfmetrics.registerFont(TTFont("RepoFont", str(font_path)))
    base_font = "RepoFont"
else:
    base_font = "Helvetica"

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="ArabicTitle", parent=styles["Title"], fontName=base_font,
    fontSize=22, leading=32, alignment=TA_CENTER, textColor=colors.HexColor("#17365D"), spaceAfter=14))
styles.add(ParagraphStyle(name="ArabicBody", parent=styles["BodyText"], fontName=base_font,
    fontSize=10, leading=17, alignment=TA_RIGHT, spaceAfter=7))
styles.add(ParagraphStyle(name="FileHeading", parent=styles["Heading2"], fontName=base_font,
    fontSize=13, leading=18, textColor=colors.HexColor("#0B6E69"), spaceBefore=8, spaceAfter=6))
styles.add(ParagraphStyle(name="CodeSmall", fontName="Courier", fontSize=6.4, leading=8,
    leftIndent=3, rightIndent=3, spaceAfter=2, splitLongWords=1))

files = subprocess.check_output(["git", "ls-files", "-z"], cwd=ROOT).decode().split("\0")
paths = []
for name in files:
    if not name or name == "Pdf-Complete-Repository.pdf" or name.startswith(".git/"):
        continue
    p = ROOT / name
    if not p.is_file():
        continue
    try:
        data = p.read_bytes()
        if b"\0" in data:
            continue
        text = data.decode("utf-8")
    except (UnicodeDecodeError, OSError):
        continue
    paths.append((name, text))

doc = SimpleDocTemplate(str(OUT), pagesize=A4, rightMargin=15*mm, leftMargin=15*mm,
                        topMargin=16*mm, bottomMargin=16*mm, title="المجلد الكامل للمشروع - PDF",
                        author="GitHub repository export")
story = [
    Spacer(1, 20*mm),
    Paragraph("النسخة الكاملة من ملفات المشروع", styles["ArabicTitle"]),
    Paragraph("مستودع qabdallh67-eng/Pdf — الفرع main", styles["ArabicBody"]),
    Spacer(1, 6*mm),
    Paragraph("هذا المستند يجمع محتويات الملفات النصية المتتبعة في المستودع في ملف PDF واحد. أُدرجت الملفات كما هي دون تعديل، مع استبعاد الملفات الثنائية غير القابلة للعرض كنص.", styles["ArabicBody"]),
    Paragraph("ملاحظة عن حالة التطبيق: ملف src/App.tsx يحتوي حاليًا على مكوّن فارغ يعرض عنصر div فقط؛ لذلك يعرض هذا التصدير محتويات المستودع الحالية ولا يخترع صفحات أو محتوى غير موجود.", styles["ArabicBody"]),
    Paragraph("فهرس الملفات", styles["FileHeading"]),
]
for name, _ in paths:
    story.append(Paragraph(escape(name), styles["CodeSmall"]))
story.append(PageBreak())
for index, (name, content) in enumerate(paths):
    story.append(Paragraph(escape(name), styles["FileHeading"]))
    story.append(Paragraph("المحتوى الكامل للملف:", styles["ArabicBody"]))
    # Keep exact source text; split into manageable lines and preserve whitespace.
    lines = content.replace("\r\n", "\n").replace("\r", "\n").split("\n")
    for start in range(0, len(lines), 85):
        chunk = "\n".join(lines[start:start+85])
        story.append(Preformatted(chunk, styles["CodeSmall"], maxLineLength=115))
    if index != len(paths) - 1:
        story.append(Spacer(1, 5*mm))

def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.grey)
    canvas.drawString(15*mm, 9*mm, "qabdallh67-eng/Pdf")
    canvas.drawRightString(A4[0]-15*mm, 9*mm, f"Page {doc.page}")
    canvas.restoreState()

doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(f"Created {OUT} with {len(paths)} text files.")
