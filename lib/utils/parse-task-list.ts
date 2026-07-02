/**
 * Parse task list from various formats (numbered, bulleted, markdown, plaintext)
 * Implements FR-001: Paste-and-go plan import
 */

export interface ParsedTask {
  text: string;
  order: number;
}

export function parseTaskList(input: string): ParsedTask[] {
  if (!input || input.trim() === '') {
    return [];
  }

  const lines = input
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  const tasks: ParsedTask[] = [];

  // Pattern 1: Numbered list (1. Task, 2. Task)
  const numberedPattern = /^\d+[\.\)]\s+(.+)$/;

  // Pattern 2: Bulleted list (- Task, * Task, • Task)
  const bulletPattern = /^[\-\*•]\s+(.+)$/;

  // Pattern 3: Checkbox list (- [ ] Task, - [x] Task)
  const checkboxPattern = /^[\-\*]\s*\[[x\s]\]\s+(.+)$/i;

  lines.forEach((line, index) => {
    let taskText: string | null = null;

    // Try numbered format
    const numberedMatch = line.match(numberedPattern);
    if (numberedMatch) {
      taskText = numberedMatch[1];
    }

    // Try checkbox format
    if (!taskText) {
      const checkboxMatch = line.match(checkboxPattern);
      if (checkboxMatch) {
        taskText = checkboxMatch[1];
      }
    }

    // Try bullet format
    if (!taskText) {
      const bulletMatch = line.match(bulletPattern);
      if (bulletMatch) {
        taskText = bulletMatch[1];
      }
    }

    // Fallback: treat line as plain text if it's not too short
    if (!taskText && line.length > 3) {
      taskText = line;
    }

    if (taskText) {
      tasks.push({
        text: taskText.trim(),
        order: tasks.length + 1,
      });
    }
  });

  return tasks;
}

/**
 * Generate rule-based skeleton suggestions based on plan title keywords
 * Implements FR-005: Manual plan creation with smart defaults
 */
export function suggestSteps(title: string): string[] {
  const lowerTitle = title.toLowerCase();

  // Writing tasks
  if (lowerTitle.includes('write') || lowerTitle.includes('draft') || lowerTitle.includes('blog')) {
    return [
      'Research and gather references',
      'Create outline',
      'Write first draft',
      'Edit and refine',
      'Proofread final version',
    ];
  }

  // Coding tasks
  if (lowerTitle.includes('code') || lowerTitle.includes('implement') || lowerTitle.includes('build') || lowerTitle.includes('develop')) {
    return [
      'Set up development environment',
      'Write tests (TDD approach)',
      'Implement core functionality',
      'Debug and fix issues',
      'Document and commit code',
    ];
  }

  // Study/learning tasks
  if (lowerTitle.includes('study') || lowerTitle.includes('learn') || lowerTitle.includes('read')) {
    return [
      'Skim material for overview',
      'Take detailed notes',
      'Create flashcards or summaries',
      'Practice with examples or problems',
      'Review and test understanding',
    ];
  }

  // Design tasks
  if (lowerTitle.includes('design') || lowerTitle.includes('mockup') || lowerTitle.includes('wireframe')) {
    return [
      'Gather inspiration and references',
      'Sketch rough ideas',
      'Create low-fidelity wireframes',
      'Design high-fidelity mockups',
      'Get feedback and iterate',
    ];
  }

  // Research tasks
  if (lowerTitle.includes('research') || lowerTitle.includes('investigate') || lowerTitle.includes('explore')) {
    return [
      'Define research questions',
      'Search for relevant sources',
      'Read and take notes',
      'Synthesize findings',
      'Document conclusions',
    ];
  }

  // Generic fallback (works for any task)
  return [
    'Prepare and gather materials',
    'Do the core work',
    'Review and wrap up',
  ];
}
