export interface PasswordValidation {
  score: number; // 0-100
  strength: 'weak' | 'fair' | 'good' | 'strong';
  feedback: string[];
  isValid: boolean;
}

export function validatePassword(password: string): PasswordValidation {
  if (!password) {
    return {
      score: 0,
      strength: 'weak',
      feedback: ['At least 8 characters', 'One uppercase letter', 'One lowercase letter', 'One number', 'One special character'],
      isValid: false,
    };
  }

  const feedback: string[] = [];
  let score = 0;

  // Length check
  if (password.length >= 8) {
    score += 25;
  } else {
    feedback.push('At least 8 characters');
  }

  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score += 20;
  } else {
    feedback.push('One uppercase letter');
  }

  // Lowercase check
  if (/[a-z]/.test(password)) {
    score += 20;
  } else {
    feedback.push('One lowercase letter');
  }

  // Number check
  if (/\d/.test(password)) {
    score += 20;
  } else {
    feedback.push('One number');
  }

  // Special character check
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    score += 15;
  } else {
    feedback.push('One special character');
  }

  // Determine strength
  let strength: PasswordValidation['strength'];
  if (score < 40) {
    strength = 'weak';
  } else if (score < 70) {
    strength = 'fair';
  } else if (score < 90) {
    strength = 'good';
  } else {
    strength = 'strong';
  }

  return {
    score: Math.min(score, 100),
    strength,
    feedback,
    isValid: score >= 80 && feedback.length === 0,
  };
}

export function getPasswordStrengthColor(strength: PasswordValidation['strength']): string {
  switch (strength) {
    case 'weak':
      return 'bg-destructive';
    case 'fair':
      return 'bg-orange-500';
    case 'good':
      return 'bg-yellow-500';
    case 'strong':
      return 'bg-green-500';
    default:
      return 'bg-secondary';
  }
} 