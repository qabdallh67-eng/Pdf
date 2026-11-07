/**
 * Core educational data and utility functions for 2nd Bac Reading Comprehension Mastery
 */

export interface QuestionTypeGuide {
  id: string;
  titleAr: string;
  titleEn: string;
  badge: string;
  pointsTypical: string;
  shortDesc: string;
  goldenRule: string;
  keyInstructions: string[];
  visualDiagramType: 'wh_matrix' | 'tf_flow' | 'pronoun_tree' | 'synonym_lens' | 'sentence_bridge' | 'opinion_scale';
  examples: {
    question: string;
    textExcerpt: string;
    analysis: string;
    idealAnswer: string;
    pitfall: string;
  }[];
  trapWarning: string;
}

export interface WhWordDetail {
  word: string;
  arabicMeaning: string;
  targetInfo: string;
  indicatorInText: string;
  example: string;
}

export const WH_WORDS_LIST: WhWordDetail[] = [
  {
    word: 'Who / Whom',
    arabicMeaning: 'مَن (للعاقل)',
    targetInfo: 'شخص، فاعل، اسم علم، جهة أو صفة بشرية',
    indicatorInText: 'أسماء مثل (Mr. Ali, scientists, researchers, volunteers)',
    example: 'Who invented the solar cooker? -> A young Moroccan student.'
  },
  {
    word: 'Where',
    arabicMeaning: 'أين (للمكان)',
    targetInfo: 'مكان، مدينة، دولة، موقع جغرافي، مؤسسة',
    indicatorInText: 'حروف الجر المكانية (in, at, on, near, inside, Morocco, Rabat)',
    example: 'Where did the conference take place? -> In Marrakesh.'
  },
  {
    word: 'When',
    arabicMeaning: 'متى (للزمان)',
    targetInfo: 'تاريخ، سنة، وقت، فترة زمنية، مرحلة',
    indicatorInText: 'تواريخ وأزمنة (in 2024, yesterday, during the summer, after)',
    example: 'When was the NGO established? -> In 2018.'
  },
  {
    word: 'Why',
    arabicMeaning: 'لماذا (للسبب والغاية)',
    targetInfo: 'سبب، علة، مبرر، هدف، دافع',
    indicatorInText: 'كلمات الربط السببية (because, since, due to, in order to, so as to)',
    example: 'Why did Leila leave her village? -> To pursue her university education.'
  },
  {
    word: 'How',
    arabicMeaning: 'كيف (للطريقة والكيفية)',
    targetInfo: 'طريقة، وسيلة، أسلوب، حالة',
    indicatorInText: 'أدوات الربط (by + V-ing, through, with, by means of)',
    example: 'How did they raise funds? -> By organizing a charity concert.'
  },
  {
    word: 'How many / How much',
    arabicMeaning: 'كم عدد / كم كمية أو تكلفة',
    targetInfo: 'عدد أو رقم إحصائي أو مبلغ مالي',
    indicatorInText: 'أرقام، نسب مئوية (%, numbers, dollars, MAD, millions)',
    example: 'How many students benefited from the program? -> Over 500 students.'
  },
  {
    word: 'What',
    arabicMeaning: 'ماذا / ما هو (للأشياء والأنشطة)',
    targetInfo: 'مفهوم، تعريف، خطة، نتيجة، مشكلة، حل',
    indicatorInText: 'أسماء الأشياء، الأفعال المنجزة، التعريفات (is defined as, means)',
    example: 'What is the main objective of the project? -> To fight illiteracy.'
  },
  {
    word: 'Which',
    arabicMeaning: 'أي / أيّهما (للاختيار والتحديد)',
    targetInfo: 'تحديد خيار من بين عدة بدائل مذكورة في النص',
    indicatorInText: 'قوائم أو صفات تفضيلية (the first, the following, between A and B)',
    example: 'Which sector created the most jobs? -> The renewable energy sector.'
  }
];

export const QUESTION_TYPES: QuestionTypeGuide[] = [
  {
    id: 'true_false',
    titleAr: 'سؤال صحيح أو خطأ مع التعليل',
    titleEn: 'True / False Statements with Justification',
    badge: 'السؤال الأكثر تنقيطاً (3 - 4 نقاط)',
    pointsTypical: '3 - 4 نقاط في الامتحان الوطني',
    shortDesc: 'يطلب منك تحديد صحة العبارة من خطئها، مع تقديم دليل قاطع ومباشر من النص.',
    goldenRule: 'قاعدة مصححي البكالوريا الصارمة: كتابة True أو False بدون تعليل صحيح = صفر (0/1)! النقطة تُمنح للتعليل المطابق من النص.',
    visualDiagramType: 'tf_flow',
    keyInstructions: [
      'اقرأ الجملة المعطاة في ورقة الامتحان بعناية وحدد الكلمات المفتاحية الحساسة (مثل: always, never, only, all, none).',
      'ابحث عن الفكرة الموازية في النص بدقة دون تسرع.',
      'قارن المعنى: هل النص يؤكد الفكرة (True) أم ينفيها أو يذكر نقيضها (False)؟',
      'اكتب بوضوح: True أو False (أو T أو F).',
      'اقتبس جملة التعليل كما هي بين علامتي تنصيص "..."، أو اذكر الجملة الدالة كاملة.',
      'تجنب كتابة فقرة كاملة؛ اقتبس فقط الشاهد المباشر الذي يثبت أو ينفي.'
    ],
    examples: [
      {
        question: 'Amine decided to abandon his dream of studying robotics.',
        textExcerpt: '"Despite financial constraints, Amine persevered and earned a scholarship to study advanced robotics in Tokyo."',
        analysis: 'الجملة تدعي أنه تخلى عن حلمه، بينما النص يقول (persevered and earned a scholarship). إذن العبارة خاطئة تماماً.',
        idealAnswer: 'False. "Despite financial constraints, Amine persevered and earned a scholarship to study advanced robotics in Tokyo."',
        pitfall: 'كتابة False فقط دون اقتباس التعليل، مما يؤدي لضياع النقطة كلياً وفق الدليل المرجعي للامتحان الوطني.'
      }
    ],
    trapWarning: 'انتبه للمحددات المطلقة في الجملة (Absolute Qualifiers): كلمات مثل (all, only, completely, never) غالباً ما تجعل الجملة False إذا كان النص يتحدث بنوع من النسبية (some, mostly, often).'
  },
  {
    id: 'wh_questions',
    titleAr: 'أسئلة الفهم المباشرة (أدوات الاستفهام)',
    titleEn: 'Wh- Comprehension Questions',
    badge: '3 - 4.5 نقطة',
    pointsTypical: '3 - 4.5 نقطة',
    shortDesc: 'أسئلة تبدأ بأداة استفهام وتبحث عن معلومة محددة داخل النص (سبب، مكان، طريقة، زمن، فاعل).',
    goldenRule: 'حدد أداة الاستفهام أولاً لمعرفة نوع المعلومة المطلوبة، ثم اتبع أسلوب المسح البصري (Scanning) للكلمات المفتاحية.',
    visualDiagramType: 'wh_matrix',
    keyInstructions: [
      'حلل أداة الاستفهام: إذا كانت Why ابحث عن (because/to/due to)، وإذا كانت Where ابحث عن مكان، وإذا كانت How ابحث عن طريقة.',
      'استخرج الكلمات المفتاحية من السؤال (الأسماء والأفعال الفريدة التي لا تتكرر كثيراً).',
      'حدد موقع الإجابة في النص بدقة.',
      'أجب بشكل مباشر ودقيق: يمكنك الإجابة بجملة تامة أو باقتباس مباشر يغطي المطلوب دون زيادة مشتتة.'
    ],
    examples: [
      {
        question: 'Why did the local cooperative switch to solar water pumps?',
        textExcerpt: '"Because traditional diesel generators were increasingly costly and harmful to the olive groves, the cooperative invested in solar-powered pumps in 2022."',
        analysis: 'السؤال يسأل عن سبب (Why)، والنص يبدأ مباشرة بـ (Because...). نقتبس السبب كاملاً وبدقة.',
        idealAnswer: 'Because traditional diesel generators were increasingly costly and harmful to the olive groves.',
        pitfall: 'إعادة كتابة الفقرة كاملة أو التوقف عند كلمة (Because) دون ذكر السببين المذكورين (التكلفة والضرر).'
      }
    ],
    trapWarning: 'إذا كان السؤال يحتوي على Did (ماضي بسيط)، تأكد من فهم أن الفعل حدث في الماضي، ولا تخلط بين الماضي والخطط المستقبلية.'
  },
  {
    id: 'sentence_completion',
    titleAr: 'إتمام الجمل من النص',
    titleEn: 'Sentence Completion from the Text',
    badge: '2 - 3 نقاط',
    pointsTypical: '2 - 3 نقاط',
    shortDesc: 'جمل غير مكتملة في ورقة الامتحان يطلب منك إتمامها بمعلومات من النص للحفاظ على المعنى والتركيب اللغوي الصحيح.',
    goldenRule: 'احرص على الانسجام القواعدي والتركيبي: الجزء الذي تضيفه من النص يجب أن يكمل بداية الجملة بسلاسة نحوية.',
    visualDiagramType: 'sentence_bridge',
    keyInstructions: [
      'اقرأ بداية الجملة المعطاة بدقة، ولاحظ أداة الربط أو نوع الفعل في نهايتها.',
      'ابحث في النص عن الفكرة المقابلة (قد تكون الجملة المعطاة معاد صياغتها Paraphrased).',
      'أكمل الفراغ بالمعلومة المطلوبة مع تعديل الضمائر أو تصريف الفعل إن لزم الأمر ليتطابق نحوياً.',
      'تأكد أن الجملة المكتملة تعطي معنى تاماً وصحيحاً.'
    ],
    examples: [
      {
        question: 'Complete: To reduce plastic waste in coastal cities, the government...',
        textExcerpt: '"In an effort to curb plastic pollution along the coastline, authorities launched a nationwide ban on single-use bags and introduced recycling incentives."',
        analysis: 'النص استخدم (authorities launched a nationwide ban...) والجملة استخدمت (the government...). إذن التكملة هي الإجراء المتخذ.',
        idealAnswer: '...launched a nationwide ban on single-use bags and introduced recycling incentives.',
        pitfall: 'تكرار كلمات موجودة أصلاً في بداية الجملة مما يجعل التركيب النحوي مكسوراً.'
      }
    ],
    trapWarning: 'انتبه لحروف الجر وأدوات الربط في نهاية الجملة المعطاة؛ إذا انتهت بـ (by) فالغالِب أن بعدها (V-ing)، وإذا انتهت بـ (to) فبعدها مصدر (Infinitive).'
  },
  {
    id: 'pronoun_reference',
    titleAr: 'على ماذا تعود الضمائر المسطرة في النص',
    titleEn: 'Pronoun Reference (What do the underlined words refer to?)',
    badge: '2 - 3 نقاط مجانية مضمونة',
    pointsTypical: '2 - 3 نقاط مضمونة',
    shortDesc: 'أسئلة تطلب تحديد الاسم أو العبارة التي يشير إليها ضمير مسطر في فقرة محددة.',
    goldenRule: 'قاعدة البحث التراجعي (Backward Search): الإجابة تقع قبل الضمير بنسبة 95% في نفس الجملة أو الجملة السابقة مباشرة، ويجب أن تطابق الضمير في النوع والعدد!',
    visualDiagramType: 'pronoun_tree',
    keyInstructions: [
      'انظر إلى الضمير المسطر في فقرته الأصلية ولا تكتفِ بالنظر إليه منفرداً.',
      'حدد نوع الضمير وعدده:',
      '  - they / them / their: تشير إلى جمع (عاقل أو غير عاقل: أشخاص أو أشياء).',
      '  - it / its: تشير إلى مفرد غير عاقل (فكرة، جهاز، مؤسسة، بلد، ظاهرة).',
      '  - he / him / his: تشير إلى مفرد مذكر عاقل.',
      '  - she / her: تشير إلى مفرد مؤنث عاقل.',
      '  - which: تعود على الاسم أو العبارة التي تسبقها مباشرة.',
      '  - where: تعود على اسم مكان.',
      '  - this / that: قد تشير إلى حدث أو فكرة كاملة مذكورة في الجملة السابقة.',
      'اختبر إجابتك: ضع الاسم الذي اخترته مكان الضمير؛ إذا استقام المعنى تماماً، فإجابتك صحيحة 100%!'
    ],
    examples: [
      {
        question: 'What does "they" in paragraph 2 refer to?',
        textExcerpt: '"Renewable energy technologies have advanced rapidly over the past decade. Because they require lower operating costs, developing nations are adopting them eagerly."',
        analysis: 'الضمير "they" في موقع فاعل جمع. بالرجوع للجملة السابقة نجد (Renewable energy technologies). وبالتعويض: Because renewable energy technologies require lower...',
        idealAnswer: 'Renewable energy technologies',
        pitfall: 'كتابة كلمة عامة مثل (costs) أو (nations) دون التحقق من الفاعل المعني بالمعنى.'
      }
    ],
    trapWarning: 'انتبه للضمائر التي تعود على جملة أو فكرة كاملة (This / That): أحياناً تشير إلى ظاهرة كاملة مذكورة قبلها وليس إلى كلمة مفردة واحدة.'
  },
  {
    id: 'synonyms_antonyms',
    titleAr: 'استخراج المرادفات والأضداد من النص',
    titleEn: 'Finding Synonyms & Antonyms (Vocabulary in Context)',
    badge: '2 - 3 نقاط',
    pointsTypical: '2 - 3 نقاط',
    shortDesc: 'البحث داخل فقرة محددة عن كلمة تحمل نفس المعنى (Synonym) أو المعنى المعاكس (Opposite / Antonym).',
    goldenRule: 'قاعدة المطابقة الصرفية (Grammatical Category Match): الكلمة المطلوبة في النص يجب أن تكون من نفس الصنف النحوي للكلمة المعطاة (اسم مع اسم، فعل مع فعل، صفة مع صفة)!',
    visualDiagramType: 'synonym_lens',
    keyInstructions: [
      'تحقق من رقم الفقرة المحددة (مثال: paragraph 1 أو paragraph 3)، ولا تبحث في أي فقرة أخرى أبداً!',
      'حدد الصنف النحوي للكلمة:',
      '  - إذا انتهت بـ (-ed) أو (-ing) أو كانت فعلاً ماضياً -> ابحث عن فعل في نفس الصيغة.',
      '  - إذا كانت صفة -> ابحث عن صفة تصف اسماً.',
      '  - إذا كانت ظرفاً ينتهي بـ (-ly) -> ابحث عن كلمة تنتهي بـ (-ly).',
      'استبدل الكلمة المقترحة في سياق النص للتأكد من أنها تعطي نفس المعنى بدقة.'
    ],
    examples: [
      {
        question: 'Find in paragraph 2 a word meaning: "flourishing" or "growing successfully"',
        textExcerpt: '"Thanks to innovative digital marketing, small artisan businesses in Fez are now thriving in international markets."',
        analysis: 'الكلمة المعطاة (flourishing) هي صفة أو اسم فاعل بصيغة (-ing). في الفقرة نجد (thriving) بنفس الصيغة ونفس المعنى بالضبط.',
        idealAnswer: 'thriving',
        pitfall: 'كتابة كلمة من فقرة أخرى غير المحددة في نص السؤال، فيلغي المصحح الإجابة حتى لو كانت صحيحة المعنى!'
      }
    ],
    trapWarning: 'تأكد هل السؤال يطلب مرادفاً (Synonym / word meaning) أم عكساً (Opposite / Antonym)! الوقوع في فخ العكس من أشهر أسباب خسارة النقاط.'
  },
  {
    id: 'opinion_title',
    titleAr: 'سؤال إبداء الرأي واختيار العنوان المناسب',
    titleEn: 'Personal Opinion & Title / Main Idea',
    badge: '2 - 3 نقاط تقييمية',
    pointsTypical: '2 - 3 نقاط',
    shortDesc: 'سؤال تقييمي يختبر قدرتك على استيعاب الفكرة العامة (Gist) والتعبير عن رأيك الشخصي مبرراً إياه بلغة إنجليزية سليمة.',
    goldenRule: 'لا توجد إجابة وحيدة صحيحة للرأي؛ المهم هو تقديم مبرر مقنع (Justification) بصياغة لغوية سليمة من جملتين.',
    visualDiagramType: 'opinion_scale',
    keyInstructions: [
      'لسؤال العنوان: اقرأ الجملة الأولى من كل فقرة (Topic Sentences) وخاتمة النص، ولا تختر عنواناً ضيقاً يتحدث عن فقرة واحدة فقط.',
      'لسؤال الرأي الشخصي (Do you think...? / In your opinion...):',
      '  - ابدأ بعبارة افتتاحية قوية مثل: "In my opinion,...", "I strongly believe that...", "From my perspective,..."',
      '  - أجب بنعم أو لا أو موافق/غير موافق (Yes, I agree / No, I do not think so).',
      '  - قدّم سبباً أو مثالاً واقعياً مستمداً من فهمك للموضوع.'
    ],
    examples: [
      {
        question: 'Do you think modern youth can preserve traditional handicrafts? Justify your opinion.',
        textExcerpt: 'The text discusses how digital tools enable traditional artisans to reach new audiences.',
        analysis: 'المطلوب رأي الطالب مع مبرر واقعي. يجب التعبير بوضوح وربط الرأي بالواقع أو النص.',
        idealAnswer: 'In my opinion, young people certainly can preserve traditional handicrafts because they can combine modern digital design and e-commerce platforms to market these crafts to a global audience.',
        pitfall: 'الإجابة بـ "Yes" أو "No" فقط دون كتابة التعليل والمبرر، مما يضيع 80% من درجة السؤال.'
      }
    ],
    trapWarning: 'تجنب النسخ الحرفي لجملة من النص لسؤال الرأي؛ يجب أن تظهر لمستك وأسلوبك الشخصي بكلماتك الخاصة.'
  }
];

export interface ExamStrategyStep {
  stepNumber: number;
  timeAllocation: string;
  titleAr: string;
  titleEn: string;
  summary: string;
  actionItems: string[];
  icon: string;
}

export const EXAM_STRATEGY_STEPS: ExamStrategyStep[] = [
  {
    stepNumber: 1,
    timeAllocation: '3 - 5 دقائق',
    titleAr: 'المسح الاستطلاعي السريع (Skimming)',
    titleEn: 'Fast Skimming & Overview',
    summary: 'إلقاء نظرة شاملة سريعة على الورقة لأخذ فكرة عامة قبل الغوص في التفاصيل.',
    actionItems: [
      'اقرأ العنوان الرئيسي (إن وجد) والمصدر وتاريخ النشر في أسفل النص.',
      'اقرأ السطر الأول من كل فقرة (Topic Sentence) لمعرفة محاور النص الأساسية.',
      'حدد موضوع النص العام: هل هو عن التكنولوجيا، التعليم، البيئة، هجرة الأدمغة، التطوع، أم تمكين الشباب؟'
    ],
    icon: 'Eye'
  },
  {
    stepNumber: 2,
    timeAllocation: '5 - 7 دقائق',
    titleAr: 'القراءة العكسية: فحص الأسئلة أولاً (Questions First)',
    titleEn: 'Previewing Questions Before Full Reading',
    summary: 'قراءة أسئلة الفهم قبل قراءة النص الكامل لبرمجة عقلك على التقاط الإجابات أثناء القراءة.',
    actionItems: [
      'سطّر تحت الكلمات المفتاحية في كل سؤال (تواريخ، أسماء، أرقام، مصطلحات نادرة).',
      'لاحظ أرقام الفقرات المذكورة في أسئلة المرادفات والضمائر (مثال: paragraph 2).',
      'اعلم أن ترتيب الأسئلة في الامتحان الوطني غالباً ما يتبع ترتيب فقرات النص تدريجياً!'
    ],
    icon: 'Target'
  },
  {
    stepNumber: 3,
    timeAllocation: '15 - 20 دقيقة',
    titleAr: 'المسح البصري واستخراج الأجوبة (Scanning & Pinpointing)',
    titleEn: 'Targeted Scanning & Precision Drafting',
    summary: 'العودة للنص كالباحث عن كنز، وتحديد الجمل الدقيقة للإجابة بدقة متناهية.',
    actionItems: [
      'ابحث عن الكلمات المفتاحية ومترادفاتها داخل الفقرة المستهدفة.',
      'في سؤال True/False: استخرج الاقتباس المباشر بدون إطالة وضع بين علامتي "..."',
      'في سؤال الضمائر: طبق قاعدة البحث التراجعي واختبر تعويض الاسم مكان الضمير.',
      'في سؤال المرادفات: تأكد من تطابق الصنف النحوي والزمن.'
    ],
    icon: 'Search'
  },
  {
    stepNumber: 4,
    timeAllocation: '5 دقائق',
    titleAr: 'المراجعة الصارمة وتفادي فخاخ النقاط (Final Audit)',
    titleEn: 'Smart Proofreading & Trap Check',
    summary: 'مراجعة ورقة الإجابة وفق سلم تنقيط المصححين لضمان عدم ضياع أي نصف نقطة.',
    actionItems: [
      'تأكد أن كل إجابة True / False تحتوي على تعليل من النص.',
      'تأكد من عدم ترك أي فراغ في ورقة الامتحان؛ حتى التخمين الذكي أفضل من الفراغ!',
      'تأكد من وضوح الخط وترقيم الأسئلة بنفس الترقيم المعتمد في ورقة الامتحان.'
    ],
    icon: 'CheckCheck'
  }
];

export interface PracticeModelText {
  id: string;
  title: string;
  theme: string;
  wordCount: number;
  text: string[];
  vocabularyGlossary: { word: string; meaningAr: string; type: string }[];
  questions: {
    sectionId: string;
    sectionTitle: string;
    items: {
      id: string;
      prompt: string;
      type: 'true_false' | 'wh' | 'completion' | 'pronoun' | 'synonym' | 'opinion';
      expectedAnswer: string;
      explanationAr: string;
      marks: number;
    }[];
  }[];
}

export const SAMPLE_2BAC_TEXTS: PracticeModelText[] = [
  {
    id: 'ai-green-morocco',
    title: 'Moroccan Youth Innovating for a Greener Future',
    theme: 'Sustainable Development & Youth Leadership',
    wordCount: 310,
    text: [
      '[1] In recent years, climate change and prolonged droughts have severely challenged agriculture in North Africa. However, in rural communities across Morocco, young innovators are stepping up with ingenious digital solutions. Rather than migrating to large metropolitan centers, many university graduates are returning to their hometowns equipped with technological skills to modernize traditional farming practices and conserve vital water resources.',
      '[2] One prominent example is Yassine El Mansouri, a 24-year-old engineering graduate from Ouarzazate. In 2023, he founded "AgriSmart", a startup that produces low-cost, solar-powered soil moisture sensors. These devices transmit real-time data to farmers\' mobile phones, alerting them precisely when and how much irrigation is needed. "Traditional irrigation wasted almost 45% of our groundwater," Yassine explained. "With smart sensors, local olive growers have reduced their water consumption by nearly half while simultaneously boosting crop productivity."',
      '[3] Because their innovative approach combines affordability with environmental impact, AgriSmart quickly gained recognition from national green entrepreneurship programs. Looking ahead, Yassine hopes to expand his initiative to neighbouring villages across the Draa-Tafilalet region. He firmly believes that investing in youth-led clean technology is the most effective path toward building sustainable rural resilience.'
    ],
    vocabularyGlossary: [
      { word: 'prolonged droughts', meaningAr: 'فترات جفاف ممتدة وطويلة', type: 'Noun phrase' },
      { word: 'stepping up', meaningAr: 'يبادرون / يتقدمون للمواجهة', type: 'Phrasal verb' },
      { word: 'soil moisture sensors', meaningAr: 'أجهزة استشعار رطوبة التربة', type: 'Compound noun' },
      { word: 'groundwater', meaningAr: 'المياه الجوفية', type: 'Noun' },
      { word: 'resilience', meaningAr: 'القدرة على الصمود والمرونة', type: 'Noun' }
    ],
    questions: [
      {
        sectionId: 'A',
        sectionTitle: 'A. Are these statements TRUE or FALSE? JUSTIFY your answers.',
        items: [
          {
            id: 'A1',
            prompt: 'Most university graduates in the text prefer moving permanently to large cities.',
            type: 'true_false',
            expectedAnswer: 'False. "Rather than migrating to large metropolitan centers, many university graduates are returning to their hometowns..." (paragraph 1)',
            explanationAr: 'العبارة خاطئة لأن النص يقول "Rather than migrating..." أي بدلاً من الهجرة، هم يعودون لبلداتهم.',
            marks: 2
          },
          {
            id: 'A2',
            prompt: 'AgriSmart sensors operate using solar power.',
            type: 'true_false',
            expectedAnswer: 'True. "...a startup that produces low-cost, solar-powered soil moisture sensors." (paragraph 2)',
            explanationAr: 'العبارة صحيحة، النص يذكر بوضوح أنها تعمل بالطاقة الشمسية (solar-powered).',
            marks: 2
          }
        ]
      },
      {
        sectionId: 'B',
        sectionTitle: 'B. Answer the following questions based on the text.',
        items: [
          {
            id: 'B1',
            prompt: 'How do the AgriSmart sensors help local farmers save water?',
            type: 'wh',
            expectedAnswer: 'They transmit real-time data to farmers\' mobile phones, alerting them precisely when and how much irrigation is needed.',
            explanationAr: 'السؤال يبدأ بـ How (كيف)، والإجابة تشرح الآلية: إرسال بيانات حية لهواتف الفلاحين لتنبيههم بوقت وكمية السقي المطلوبة بدقة.',
            marks: 2
          },
          {
            id: 'B2',
            prompt: 'Why did AgriSmart receive recognition from national green programs?',
            type: 'wh',
            expectedAnswer: 'Because their innovative approach combines affordability with environmental impact.',
            explanationAr: 'السؤال يبدأ بـ Why (لماذا)، والنص في بداية الفقرة 3 يبدأ مباشرة بـ "Because their innovative approach combines affordability with environmental impact".',
            marks: 2
          }
        ]
      },
      {
        sectionId: 'C',
        sectionTitle: 'C. Complete the following sentences with information from the text.',
        items: [
          {
            id: 'C1',
            prompt: 'Complete: By utilizing smart sensors, local olive growers were able to...',
            type: 'completion',
            expectedAnswer: '...reduce their water consumption by nearly half while boosting crop productivity.',
            explanationAr: 'الإتمام الدقيق لما حققه مزارعو الزيتون: خفض استهلاك المياه إلى النصف تقريباً وزيادة إنتاجية المحاصيل.',
            marks: 1.5
          }
        ]
      },
      {
        sectionId: 'D',
        sectionTitle: 'D. Find in the text words that mean almost the same as:',
        items: [
          {
            id: 'D1',
            prompt: 'clever / creative (paragraph 1)',
            type: 'synonym',
            expectedAnswer: 'ingenious',
            explanationAr: 'الصفة (clever / creative) تعني مبتكر أو بارع، وفي الفقرة 1 نجد (ingenious digital solutions).',
            marks: 1
          },
          {
            id: 'D2',
            prompt: 'increasing / improving (paragraph 2)',
            type: 'synonym',
            expectedAnswer: 'boosting',
            explanationAr: 'الفعل بصيغة -ing (increasing) يطابق (boosting crop productivity) في الفقرة 2.',
            marks: 1
          }
        ]
      },
      {
        sectionId: 'E',
        sectionTitle: 'E. What do the underlined words in the text refer to?',
        items: [
          {
            id: 'E1',
            prompt: '"These devices" (paragraph 2)',
            type: 'pronoun',
            expectedAnswer: 'solar-powered soil moisture sensors (or soil moisture sensors)',
            explanationAr: 'الاسم الإشاري الجمع "These devices" يعود على أجهزة استشعار رطوبة التربة المذكورة في الجملة السابقة مباشرة.',
            marks: 1
          },
          {
            id: 'E2',
            prompt: '"their" (paragraph 3)',
            type: 'pronoun',
            expectedAnswer: 'AgriSmart (or AgriSmart team / Yassine and his team)',
            explanationAr: 'صفة الملكية "their" تعود على فريق عمل شركة AgriSmart.',
            marks: 1
          }
        ]
      },
      {
        sectionId: 'F',
        sectionTitle: 'F. Personal Opinion Question',
        items: [
          {
            id: 'F1',
            prompt: 'In your opinion, what is the best way to encourage young people to invest in rural agriculture? (1-2 sentences)',
            type: 'opinion',
            expectedAnswer: 'In my opinion, the government should offer startup grants, modern technical training, and reliable internet infrastructure so young graduates can build high-tech agribusinesses in their hometowns.',
            explanationAr: 'سؤال رأي شخصي؛ يتطلب إجابة معللة تبدأ بـ In my opinion وتطرح فكرة منطقية بلغة سليمة.',
            marks: 2.5
          }
        ]
      }
    ]
  }
];

/**
 * Pure helper function to classify a question prompt into one of the 2 Bac categories
 */
export function classifyPromptType(prompt: string): 'true_false' | 'wh' | 'completion' | 'pronoun' | 'synonym' | 'opinion' {
  const p = prompt.trim().toLowerCase();
  if (p.includes('true') || p.includes('false') || p.includes('justify')) {
    return 'true_false';
  }
  if (p.includes('refer') || p.includes('underlined word') || p.includes('underlined pronoun')) {
    return 'pronoun';
  }
  if (p.includes('mean') || p.includes('synonym') || p.includes('opposite') || p.includes('find in the text')) {
    return 'synonym';
  }
  if (p.includes('complete') || p.includes('fill in')) {
    return 'completion';
  }
  if (p.includes('opinion') || p.includes('do you think') || p.includes('would you') || p.includes('title')) {
    return 'opinion';
  }
  if (p.startsWith('who') || p.startsWith('why') || p.startsWith('where') || p.startsWith('when') || p.startsWith('how') || p.startsWith('what') || p.startsWith('which')) {
    return 'wh';
  }
  return 'wh';
}

/**
 * Calculates total possible score for an exam text
 */
export function calculateExamTotalScore(text: PracticeModelText): number {
  let total = 0;
  for (const sec of text.questions) {
    for (const item of sec.items) {
      total += item.marks;
    }
  }
  return total;
}

/**
 * Verifies if an answer contains an adequate justification quotation for a True/False statement
 */
export function evaluateTrueFalseAnswer(studentAnswer: string, expectedTruth: boolean): {
  declaredState: boolean | null;
  hasQuote: boolean;
  isCorrectTruth: boolean;
  scoreRatio: number;
  feedbackAr: string;
} {
  const clean = studentAnswer.trim().toLowerCase();
  const startsWithTrue = clean.startsWith('true') || clean.startsWith('t.');
  const startsWithFalse = clean.startsWith('false') || clean.startsWith('f.');

  let declaredState: boolean | null = null;
  if (startsWithTrue) declaredState = true;
  else if (startsWithFalse) declaredState = false;

  const hasQuote = studentAnswer.includes('"') || studentAnswer.length > 25;
  const isCorrectTruth = declaredState === expectedTruth;

  let scoreRatio = 0;
  let feedbackAr = '';

  if (declaredState === null) {
    feedbackAr = 'لم تحدد ما إذا كانت العبارة True أم False بوضوح.';
    scoreRatio = 0;
  } else if (!isCorrectTruth) {
    feedbackAr = 'تحديدك لصحة العبارة غير صحيح. في البكالوريا، إذا كان الحكم خاطئاً تحصل على 0 فوراً.';
    scoreRatio = 0;
  } else if (isCorrectTruth && !hasQuote) {
    feedbackAr = 'حددت الحكم بشكل صحيح ولكن ينقصك الاقتباس والتعليل من النص! وفق سلم التنقيط الوطني: الحكم دون تعليل = 0.';
    scoreRatio = 0.2; // partial warning
  } else {
    feedbackAr = 'ممتاز! حددت الحكم بشكل صحيح وأرفقت التعليل من النص.';
    scoreRatio = 1.0;
  }

  return { declaredState, hasQuote, isCorrectTruth, scoreRatio, feedbackAr };
}
