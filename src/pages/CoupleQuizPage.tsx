import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  ZoomIn,
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { useBook } from '../book/BookContext';
import { Polaroid } from '../components/Polaroid';
import { quiz } from '../content/story';
import { colors, fonts } from '../theme/tokens';

export function CoupleQuizPage() {
  const { hasVisitedPage } = useBook();
  const hasVisited = hasVisitedPage(5);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState<Set<number>>(new Set());
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [wrongFeedback, setWrongFeedback] = useState('');
  const [quizFinished, setQuizFinished] = useState(false);

  const question = quiz.questions[currentQuestionIndex];

  const handleGuess = (index: number) => {
    if (answeredCorrectly || quizFinished) return;

    if (index === question.correctIndex) {
      setAnsweredCorrectly(true);
      setWrongFeedback('');
    } else {
      setWrongGuesses((prev) => new Set(prev).add(index));
      const randomMsg =
        quiz.wrongMessages[
          Math.floor(Math.random() * quiz.wrongMessages.length)
        ];
      setWrongFeedback(randomMsg);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setWrongGuesses(new Set());
      setAnsweredCorrectly(false);
      setWrongFeedback('');
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{quiz.title}</Text>

        {!quizFinished ? (
          <Animated.View
            key={`question-${currentQuestionIndex}`}
            entering={hasVisited && currentQuestionIndex === 0 ? undefined : FadeIn.duration(400)}
            style={styles.quizArea}
          >
            <Text style={styles.counter}>
              Pergunta {currentQuestionIndex + 1} de {quiz.questions.length}
            </Text>

            <View style={styles.questionCard}>
              <Text style={styles.questionText}>{question.question}</Text>
            </View>

            <View style={styles.optionsContainer}>
              {question.options.map((option, idx) => (
                <QuizOption
                  key={`opt-${idx}`}
                  text={option}
                  isCorrect={idx === question.correctIndex}
                  isWrong={wrongGuesses.has(idx)}
                  answeredCorrectly={answeredCorrectly}
                  onPress={() => handleGuess(idx)}
                />
              ))}
            </View>

            {wrongFeedback !== '' && !answeredCorrectly && (
              <Animated.Text entering={FadeIn} style={styles.wrongFeedback}>
                {wrongFeedback}
              </Animated.Text>
            )}

            {answeredCorrectly && (
              <Animated.View
                entering={FadeInDown.duration(600).springify()}
                style={styles.successArea}
              >
                <Text style={styles.successFeedback}>
                  {question.feedbackSuccess}
                </Text>

                <Animated.View entering={ZoomIn.delay(300).springify()}>
                  <Polaroid
                    source={question.rewardPhoto}
                    caption={question.rewardCaption}
                    width={220}
                    rotation={-2}
                  />
                </Animated.View>

                <Pressable onPress={handleNext} style={styles.nextButton}>
                  <Text style={styles.nextButtonText}>
                    {currentQuestionIndex < quiz.questions.length - 1
                      ? 'Próxima Pergunta ›'
                      : 'Ver Resultado'}
                  </Text>
                </Pressable>
              </Animated.View>
            )}
          </Animated.View>
        ) : (
          <Animated.View entering={FadeIn.duration(600)} style={styles.finaleArea}>
            <Text style={styles.finaleText}>{quiz.finale}</Text>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}

// Subcomponent for animatable option
function QuizOption({
  text,
  isCorrect,
  isWrong,
  answeredCorrectly,
  onPress,
}: {
  text: string;
  isCorrect: boolean;
  isWrong: boolean;
  answeredCorrectly: boolean;
  onPress: () => void;
}) {
  const shake = useSharedValue(0);

  const handlePress = () => {
    if (answeredCorrectly) return;
    if (!isCorrect) {
      shake.value = withSequence(
        withTiming(10, { duration: 50 }),
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    }
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shake.value }],
    };
  });

  let bgColor = '#fff';
  let borderColor = '#E3D9CE';
  let textColor: string = colors.ink;

  if (isWrong) {
    bgColor = '#fce4e4';
    borderColor = '#f5c6c6';
    textColor = '#a83232';
  } else if (answeredCorrectly && isCorrect) {
    bgColor = '#e6f4ea';
    borderColor = '#cce3d1';
    textColor = '#2e6b3c';
  } else if (answeredCorrectly && !isCorrect) {
    // Fade out other options slightly
    bgColor = 'rgba(255,255,255,0.5)';
    textColor = 'rgba(59,34,25,0.5)';
  }

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={handlePress}
        disabled={isWrong || answeredCorrectly}
        style={[
          styles.optionButton,
          { backgroundColor: bgColor, borderColor },
        ]}
      >
        <Text style={[styles.optionText, { color: textColor }]}>{text}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.paper,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  title: {
    fontFamily: fonts.nunitoBold,
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#9c4d5d',
    marginBottom: 30,
    textAlign: 'center',
  },
  quizArea: {
    width: '100%',
    alignItems: 'center',
  },
  counter: {
    fontFamily: fonts.nunito,
    fontSize: 14,
    color: 'rgba(59,34,25,0.6)',
    marginBottom: 12,
  },
  questionCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E3D9CE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 24,
  },
  questionText: {
    fontFamily: fonts.caveatBold,
    fontSize: 26,
    color: colors.ink,
    textAlign: 'center',
    lineHeight: 32,
  },
  optionsContainer: {
    width: '100%',
    gap: 12,
  },
  optionButton: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  optionText: {
    fontFamily: fonts.nunitoBold,
    fontSize: 16,
    textAlign: 'center',
  },
  wrongFeedback: {
    fontFamily: fonts.caveat,
    fontSize: 20,
    color: '#a83232',
    marginTop: 16,
    textAlign: 'center',
  },
  successArea: {
    width: '100%',
    alignItems: 'center',
    marginTop: 24,
  },
  successFeedback: {
    fontFamily: fonts.caveatBold,
    fontSize: 28,
    color: '#2e6b3c',
    marginBottom: 20,
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#9c4d5d',
    borderRadius: 20,
  },
  nextButtonText: {
    fontFamily: fonts.nunitoBold,
    fontSize: 14,
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  finaleArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finaleText: {
    fontFamily: fonts.caveatBold,
    fontSize: 36,
    color: '#9c4d5d',
    textAlign: 'center',
  },
});
