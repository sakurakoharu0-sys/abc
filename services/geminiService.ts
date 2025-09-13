import { GoogleGenAI, Type } from "@google/genai";
import type { WritingFeedback, WritingPrompt, TranslationExercise, VocabularyItem, GrammarRule, GrammarExercise, ReadingPassage, ListeningExercise, Lesson, KnowledgeArticle } from '../types';

const ai = new GoogleGenAI({ apiKey: "AIzaSyBRe_pITrXyP15Mnf68spKow0xnseQ-BjQ" }); 

const getLevelDescription = (levelName: string) => {
    const levelMap: { [key: string]: string } = {
        'Beginner': 'CEFR A1',
        'Elementary': 'CEFR A2',
        'Intermediate': 'CEFR B1',
        'Upper-Intermediate': 'CEFR B2',
        'Advanced': 'CEFR C1',
        'Proficient': 'CEFR C2'
    };
    return levelMap[levelName] || levelName;
}

export const generateWritingPrompt = async (
  languageName: string,
  levelName: string,
  topic: string
): Promise<WritingPrompt | null> => {
  try {
    const levelDesc = getLevelDescription(levelName);
    const prompt = `You are a language learning assistant. Create a simple writing prompt for a Burmese speaker learning ${languageName} at a ${levelDesc} level.
The topic is "${topic}".
Provide the prompt in ${languageName}, and also provide the Burmese and English translations.
Respond with a JSON object with keys: "prompt_target", "prompt_myanmar", "prompt_english".`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              prompt_target: { type: Type.STRING },
              prompt_myanmar: { type: Type.STRING },
              prompt_english: { type: Type.STRING },
            }
          }
        }
    });
    
    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as WritingPrompt;

  } catch (error) {
    console.error("Error generating writing prompt:", error);
    return null;
  }
};

export const getWritingFeedback = async (
  languageName: string,
  prompt: string,
  userText: string
): Promise<WritingFeedback | null> => {
  try {
    const systemInstruction = `You are 'Yui', a friendly and encouraging AI language tutor from a futuristic anime world. You specialize in teaching writing to native Burmese speakers. Your personality is gentle, patient, and positive. You always provide feedback in both Burmese (Myanmar) and English. Your goal is to build the user's confidence.`;

    const userPrompt = `Target Language: ${languageName}
Original Prompt for User: ${prompt}
User's Written Text: ${userText}

Analyze the "User's Written Text". Provide feedback following the JSON schema precisely.
Analysis Instructions:
1.  Overall Feedback: Give a warm, positive summary.
2.  Corrections: Identify specific errors (grammar, spelling, unnatural phrasing). For each, provide the incorrect part, the corrected version, and a simple explanation for the change.
3.  Score: Rate the writing from 1 to 100 based on clarity, grammar, and relevance to the prompt.
4.  Example Sentence: Provide one new, perfectly written sentence in the target language that is related to the topic, to give the user something to learn from.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER, description: "A score from 1 to 100." },
              overall_feedback: {
                type: Type.OBJECT,
                description: "General, encouraging feedback.",
                properties: {
                  myanmar: { type: Type.STRING, description: "Feedback in Burmese." },
                  english: { type: Type.STRING, description: "Feedback in English." },
                },
                required: ['myanmar', 'english']
              },
              corrections: {
                type: Type.ARRAY,
                description: "Specific corrections for the user's text.",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    original: { type: Type.STRING, description: "The user's original incorrect phrase." },
                    corrected: { type: Type.STRING, description: "The corrected version of the phrase." },
                    explanation: {
                      type: Type.OBJECT,
                      properties: {
                        myanmar: { type: Type.STRING, description: "Explanation in Burmese." },
                        english: { type: Type.STRING, description: "Explanation in English." },
                      },
                      required: ['myanmar', 'english']
                    }
                  },
                  required: ['original', 'corrected', 'explanation']
                }
              },
              example_sentence: {
                type: Type.STRING,
                description: "A well-written example sentence in the target language."
              }
            },
            required: ['score', 'overall_feedback', 'corrections', 'example_sentence']
          }
        }
    });

    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as WritingFeedback;
    
  } catch (error) {
    console.error("Error getting writing feedback:", error);
    return null;
  }
};


export const generateTranslationExercises = async (
  languageName: string,
  levelName: string,
  topic: string,
  itemCount: number,
): Promise<TranslationExercise[] | null> => {
  try {
    const levelDesc = getLevelDescription(levelName);
    const prompt = `You are a language learning assistant for Burmese speakers.
Generate exactly ${itemCount} sentence translation exercises for a ${levelDesc} learner of ${languageName}.
The topic is "${topic}".
Each exercise should have a sentence in Burmese and its correct translation in ${languageName}.
Respond with a JSON array of objects, where each object has keys: "myanmar_sentence" and "target_language_sentence".`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              myanmar_sentence: { type: Type.STRING },
              target_language_sentence: { type: Type.STRING },
            },
            required: ['myanmar_sentence', 'target_language_sentence']
          }
        }
      }
    });
    
    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as TranslationExercise[];

  } catch (error) {
    console.error("Error generating translation exercises:", error);
    return null;
  }
};


export const generateVocabularyList = async (
  languageName: string,
  levelName: string,
  topic: string,
  itemCount: number,
): Promise<VocabularyItem[] | null> => {
  try {
    const levelDesc = getLevelDescription(levelName);
    const prompt = `You are a language learning assistant for Burmese speakers.
Generate a list of ${itemCount} essential vocabulary words for a ${levelDesc} learner of ${languageName}.
The topic is "${topic}".
For each word, provide the word in the target language, a simple pronunciation guide (romanization for languages like Japanese/Chinese/Korean/Thai, or phonetic for others), its meaning in Burmese, and a simple example sentence in the target language.
Respond with a JSON array of objects, where each object has keys: "word_target_language", "pronunciation_guide", "meaning_myanmar", and "example_sentence".`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              word_target_language: { type: Type.STRING },
              pronunciation_guide: { type: Type.STRING },
              meaning_myanmar: { type: Type.STRING },
              example_sentence: { type: Type.STRING },
            },
            required: ['word_target_language', 'pronunciation_guide', 'meaning_myanmar', 'example_sentence']
          }
        }
      }
    });

    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as VocabularyItem[];

  } catch (error) {
    console.error("Error generating vocabulary list:", error);
    return null;
  }
};

export const generateGrammarRuleAndExercises = async (
  languageName: string,
  levelName: string,
  topic: string,
  itemCount: number,
): Promise<{ rule: GrammarRule; exercises: GrammarExercise[] } | null> => {
  try {
    const levelDesc = getLevelDescription(levelName);
    const prompt = `You are a language learning assistant for Burmese speakers.
Create a grammar lesson for a ${levelDesc} learner of ${languageName}, focusing on the specific grammar topic: "${topic}".

First, define the grammar rule. The rule name should be exactly "${topic}".
Then, generate exactly ${itemCount} fill-in-the-blank exercises to practice this rule. For each exercise, provide 3 incorrect options and the correct answer. The sentence template should use "___" for the blank.

Respond with a single JSON object with two keys: "rule" and "exercises".
- "rule": an object with "rule_name", "explanation_myanmar", "explanation_target_language", "example_sentence", "example_translation_myanmar".
- "exercises": an array of ${itemCount} objects, each with "sentence_template", "correct_answer", and "options" (an array of 4 strings, including the correct answer).`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            rule: {
              type: Type.OBJECT,
              properties: {
                rule_name: { type: Type.STRING },
                explanation_myanmar: { type: Type.STRING },
                explanation_target_language: { type: Type.STRING },
                example_sentence: { type: Type.STRING },
                example_translation_myanmar: { type: Type.STRING },
              },
              required: ['rule_name', 'explanation_myanmar', 'explanation_target_language', 'example_sentence', 'example_translation_myanmar']
            },
            exercises: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sentence_template: { type: Type.STRING },
                  correct_answer: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ['sentence_template', 'correct_answer', 'options']
              }
            }
          },
          required: ['rule', 'exercises']
        }
      }
    });

    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as { rule: GrammarRule; exercises: GrammarExercise[] };

  } catch (error) {
    console.error("Error generating grammar lesson:", error);
    return null;
  }
};

export const generateReadingPassage = async (
  languageName: string,
  levelName: string,
  topic: string
): Promise<ReadingPassage | null> => {
  try {
    const levelDesc = getLevelDescription(levelName);
    const prompt = `You are a language learning assistant for Burmese speakers.
Generate a short reading passage in ${languageName} for a ${levelDesc} learner.
The topic is "${topic}".
The passage should be interesting and appropriate for the learner's level.
After the passage, create 3-5 multiple-choice comprehension questions about the text. Each question should have 4 options, one of which is the correct answer.

Respond with a single JSON object containing "title", "passage", and an array of "questions".
Each question object should have "question", an array of "options", and the "correct_answer".`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            passage: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correct_answer: { type: Type.STRING },
                },
                required: ['question', 'options', 'correct_answer']
              }
            }
          },
          required: ['title', 'passage', 'questions']
        }
      }
    });

    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as ReadingPassage;

  } catch (error) {
    console.error("Error generating reading passage:", error);
    return null;
  }
};

export const generateListeningExercise = async (
    languageName: string,
    levelName: string,
    topic: string
): Promise<ListeningExercise | null> => {
    try {
        const levelDesc = getLevelDescription(levelName);
        const prompt = `You are a language learning assistant for Burmese speakers.
Generate a single, clear sentence in ${languageName} for a listening comprehension exercise.
The sentence should be appropriate for a ${levelDesc} learner and related to the topic "${topic}".
It should be a complete sentence, not just a phrase.

Respond with a JSON object with two keys:
1. "audio_text": The sentence to be spoken.
2. "difficulty_description": A brief description in English of why this sentence is suitable for the specified level (e.g., "Uses basic present tense and common vocabulary.").`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        audio_text: { type: Type.STRING },
                        difficulty_description: { type: Type.STRING },
                    },
                    required: ['audio_text', 'difficulty_description']
                }
            }
        });

        const jsonString = response.text.trim();
        return JSON.parse(jsonString) as ListeningExercise;

    } catch (error) {
        console.error("Error generating listening exercise:", error);
        return null;
    }
};

export const generateLesson = async (
  languageName: string,
  levelName: string,
  topic: string
): Promise<Lesson | null> => {
  try {
    const levelDesc = getLevelDescription(levelName);
    const prompt = `You are a language learning curriculum designer for Burmese speakers.
Create a complete lesson in ${languageName} for a ${levelDesc} learner. The topic is "${topic}".
The lesson must contain four parts: Vocabulary, Grammar, Reading, and Writing.

Respond with a single JSON object that strictly follows this schema:
- "title": A suitable title for the lesson in the target language.
- "vocabulary": An array of 5-7 essential vocabulary words related to the topic. Each object must have "word_target_language", "pronunciation_guide", "meaning_myanmar", and "example_sentence".
- "grammar": A single grammar rule object relevant to the level and topic. The object must have "rule_name", "explanation_myanmar", "explanation_target_language", "example_sentence", "example_translation_myanmar".
- "reading": A short reading passage object on the topic. The object must have "title", "passage", and an array of 2-3 multiple-choice "questions". Each question must have "question", an array of 4 "options", and the "correct_answer".
- "writingPrompt": A simple writing prompt object on the topic. The object must have "prompt_target", "prompt_myanmar", "prompt_english".`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            vocabulary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  word_target_language: { type: Type.STRING },
                  pronunciation_guide: { type: Type.STRING },
                  meaning_myanmar: { type: Type.STRING },
                  example_sentence: { type: Type.STRING },
                },
                required: ['word_target_language', 'pronunciation_guide', 'meaning_myanmar', 'example_sentence']
              }
            },
            grammar: {
              type: Type.OBJECT,
              properties: {
                rule_name: { type: Type.STRING },
                explanation_myanmar: { type: Type.STRING },
                explanation_target_language: { type: Type.STRING },
                example_sentence: { type: Type.STRING },
                example_translation_myanmar: { type: Type.STRING },
              },
              required: ['rule_name', 'explanation_myanmar', 'explanation_target_language', 'example_sentence', 'example_translation_myanmar']
            },
            reading: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                passage: { type: Type.STRING },
                questions: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      question: { type: Type.STRING },
                      options: { type: Type.ARRAY, items: { type: Type.STRING } },
                      correct_answer: { type: Type.STRING },
                    },
                    required: ['question', 'options', 'correct_answer']
                  }
                }
              },
              required: ['title', 'passage', 'questions']
            },
            writingPrompt: {
              type: Type.OBJECT,
              properties: {
                prompt_target: { type: Type.STRING },
                prompt_myanmar: { type: Type.STRING },
                prompt_english: { type: Type.STRING },
              },
              required: ['prompt_target', 'prompt_myanmar', 'prompt_english']
            }
          },
          required: ['title', 'vocabulary', 'grammar', 'reading', 'writingPrompt']
        }
      }
    });

    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as Lesson;

  } catch (error) {
    console.error("Error generating lesson:", error);
    return null;
  }
};

export const generateKnowledgeArticle = async (
  languageName: string,
  topic: string
): Promise<KnowledgeArticle | null> => {
  try {
    const prompt = `You are a helpful assistant that generates educational content.
Write a short, informative article for a language learner about the topic: "${topic}".
The article should be written entirely in the ${languageName} language.
Also, provide the standard BCP 47 language code for "${languageName}".

Respond with a JSON object with keys: "title", "content", and "languageBcp47Code".
- "title": The article title in ${languageName}.
- "content": The article content in ${languageName}, formatted with paragraphs using '\\n'.
- "languageBcp47Code": The BCP 47 code (e.g., "es-ES" for Spanish, "fr-FR" for French).`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
            languageBcp47Code: { type: Type.STRING }
          },
          required: ['title', 'content', 'languageBcp47Code']
        }
      }
    });

    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as KnowledgeArticle;

  } catch (error) {
    console.error("Error generating knowledge article:", error);
    return null;
  }
};
