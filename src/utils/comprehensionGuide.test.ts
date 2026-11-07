import test from 'node:test';
import assert from 'node:assert/strict';
import {
  classifyPromptType,
  calculateExamTotalScore,
  evaluateTrueFalseAnswer,
  WH_WORDS_LIST,
  QUESTION_TYPES,
  SAMPLE_2BAC_TEXTS
} from './comprehensionGuide';

test('Wh-words list contains all key examination interrogatives', () => {
  assert.ok(WH_WORDS_LIST.length >= 6);
  const words = WH_WORDS_LIST.map(w => w.word);
  assert.ok(words.some(w => w.includes('Who')));
  assert.ok(words.some(w => w.includes('Where')));
  assert.ok(words.some(w => w.includes('When')));
  assert.ok(words.some(w => w.includes('Why')));
  assert.ok(words.some(w => w.includes('How')));
});

test('Question types cover all 6 National Baccalaureate sections', () => {
  assert.equal(QUESTION_TYPES.length, 6);
  const ids = QUESTION_TYPES.map(q => q.id);
  assert.ok(ids.includes('true_false'));
  assert.ok(ids.includes('wh_questions'));
  assert.ok(ids.includes('sentence_completion'));
  assert.ok(ids.includes('pronoun_reference'));
  assert.ok(ids.includes('synonyms_antonyms'));
  assert.ok(ids.includes('opinion_title'));
});

test('Prompt classifier categorizes question types accurately', () => {
  assert.equal(
    classifyPromptType('Are these sentences TRUE or FALSE? Justify.'),
    'true_false'
  );
  assert.equal(
    classifyPromptType('What does the underlined word "they" in paragraph 2 refer to?'),
    'pronoun'
  );
  assert.equal(
    classifyPromptType('Find in the text words that mean almost the same as "innovative"'),
    'synonym'
  );
  assert.equal(
    classifyPromptType('Complete the following sentences with information from the text'),
    'completion'
  );
  assert.equal(
    classifyPromptType('In your opinion, do you think AI will replace teachers?'),
    'opinion'
  );
  assert.equal(
    classifyPromptType('Why did the author travel to Morocco in 2023?'),
    'wh'
  );
});

test('Exam total score calculates correct marks distribution', () => {
  const sample = SAMPLE_2BAC_TEXTS[0];
  const total = calculateExamTotalScore(sample);
  // Total marks in standard 2 Bac comprehension section is typically 15 points
  assert.ok(total >= 10 && total <= 20);
});

test('evaluateTrueFalseAnswer checks truth and justification requirement', () => {
  // Correct truth and has quotation
  const res1 = evaluateTrueFalseAnswer(
    'False. "Rather than migrating to cities, graduates are returning to their hometowns"',
    false
  );
  assert.equal(res1.isCorrectTruth, true);
  assert.equal(res1.hasQuote, true);
  assert.equal(res1.scoreRatio, 1.0);

  // Correct truth but no justification quote (in national exam, no justification = penalty)
  const res2 = evaluateTrueFalseAnswer('False', false);
  assert.equal(res2.isCorrectTruth, true);
  assert.equal(res2.hasQuote, false);
  assert.ok(res2.scoreRatio < 0.5);

  // Wrong truth
  const res3 = evaluateTrueFalseAnswer('True. "Some text here..."', false);
  assert.equal(res3.isCorrectTruth, false);
  assert.equal(res3.scoreRatio, 0);
});
