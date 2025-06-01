import { ModelTemplate } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const modelTemplates: ModelTemplate[] = [
  {
    id: uuidv4(),
    name: "5 WHYs Analysis",
    description: "Identify the root cause of a problem by asking 'why' five times in succession.",
    icon: "help-circle",
    category: "Problem Solving",
    steps: [
      {
        id: uuidv4(),
        title: "Define the Problem",
        description: "Clearly state the problem you're trying to solve.",
        inputType: "textarea",
        placeholder: "What problem are you trying to solve?"
      },
      {
        id: uuidv4(),
        title: "First Why",
        description: "Ask why this problem occurs.",
        inputType: "textarea",
        placeholder: "Why does this problem occur?"
      },
      {
        id: uuidv4(),
        title: "Second Why",
        description: "Based on your first answer, ask why again.",
        inputType: "textarea",
        placeholder: "Why does that happen?"
      },
      {
        id: uuidv4(),
        title: "Third Why",
        description: "Keep going deeper. Ask why again.",
        inputType: "textarea",
        placeholder: "Why does that happen?"
      },
      {
        id: uuidv4(),
        title: "Fourth Why",
        description: "Continue asking why to get closer to the root cause.",
        inputType: "textarea",
        placeholder: "Why does that happen?"
      },
      {
        id: uuidv4(),
        title: "Fifth Why",
        description: "This should get you to the root cause.",
        inputType: "textarea",
        placeholder: "Why does that happen?"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "SWOT Analysis",
    description: "Evaluate strengths, weaknesses, opportunities, and threats.",
    icon: "layout-dashboard",
    category: "Strategic Planning",
    steps: [
      {
        id: uuidv4(),
        title: "Context",
        description: "What situation or decision are you analyzing?",
        inputType: "textarea",
        placeholder: "Describe the situation you're analyzing"
      },
      {
        id: uuidv4(),
        title: "Strengths",
        description: "List internal positive attributes and resources.",
        inputType: "textarea",
        placeholder: "What are your strengths in this situation?"
      },
      {
        id: uuidv4(),
        title: "Weaknesses",
        description: "List internal negative attributes and limitations.",
        inputType: "textarea",
        placeholder: "What are your weaknesses in this situation?"
      },
      {
        id: uuidv4(),
        title: "Opportunities",
        description: "List external factors that may positively impact you.",
        inputType: "textarea",
        placeholder: "What opportunities exist in this situation?"
      },
      {
        id: uuidv4(),
        title: "Threats",
        description: "List external factors that may negatively impact you.",
        inputType: "textarea",
        placeholder: "What threats exist in this situation?"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Eisenhower Matrix",
    description: "Prioritize tasks based on urgency and importance.",
    icon: "grid",
    category: "Productivity",
    steps: [
      {
        id: uuidv4(),
        title: "Task List",
        description: "List all the tasks you need to prioritize (comma separated).",
        inputType: "textarea",
        placeholder: "Task 1, Task 2, Task 3, etc."
      },
      {
        id: uuidv4(),
        title: "Urgent & Important",
        description: "Tasks that need immediate attention and have significant impact.",
        inputType: "textarea",
        placeholder: "Which tasks are both urgent and important?"
      },
      {
        id: uuidv4(),
        title: "Important, Not Urgent",
        description: "Tasks with high impact but can be scheduled.",
        inputType: "textarea",
        placeholder: "Which tasks are important but not urgent?"
      },
      {
        id: uuidv4(),
        title: "Urgent, Not Important",
        description: "Tasks with low impact but require quick action.",
        inputType: "textarea",
        placeholder: "Which tasks are urgent but not important?"
      },
      {
        id: uuidv4(),
        title: "Neither Urgent Nor Important",
        description: "Tasks with low impact and no time pressure.",
        inputType: "textarea",
        placeholder: "Which tasks are neither urgent nor important?"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Problem Tree",
    description: "Visualize and analyze causes and consequences of problems.",
    icon: "git-branch",
    category: "Problem Analysis",
    steps: [
      {
        id: uuidv4(),
        title: "Core Problem",
        description: "State the main problem you want to analyze.",
        inputType: "textarea",
        placeholder: "What is the core problem?"
      },
      {
        id: uuidv4(),
        title: "Causes",
        description: "List the root causes of the problem.",
        inputType: "textarea",
        placeholder: "What are the underlying causes?"
      },
      {
        id: uuidv4(),
        title: "Effects",
        description: "List the consequences and impacts of the problem.",
        inputType: "textarea",
        placeholder: "What are the effects of this problem?"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "SMART Goals",
    description: "Set specific, measurable, achievable, relevant, and time-bound goals.",
    icon: "target",
    category: "Goal Setting",
    steps: [
      {
        id: uuidv4(),
        title: "Specific",
        description: "What exactly do you want to accomplish?",
        inputType: "textarea",
        placeholder: "Be specific about your goal"
      },
      {
        id: uuidv4(),
        title: "Measurable",
        description: "How will you measure progress and success?",
        inputType: "textarea",
        placeholder: "How will you track progress?"
      },
      {
        id: uuidv4(),
        title: "Achievable",
        description: "Is this goal realistic with your current resources?",
        inputType: "textarea",
        placeholder: "What makes this goal achievable?"
      },
      {
        id: uuidv4(),
        title: "Relevant",
        description: "Why is this goal important to you?",
        inputType: "textarea",
        placeholder: "How does this align with your objectives?"
      },
      {
        id: uuidv4(),
        title: "Time-bound",
        description: "When do you want to achieve this goal?",
        inputType: "textarea",
        placeholder: "Set a deadline for your goal"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "PDCA Cycle",
    description: "Plan, Do, Check, Act cycle for continuous improvement.",
    icon: "refresh-cw",
    category: "Process Improvement",
    steps: [
      {
        id: uuidv4(),
        title: "Plan",
        description: "What do you want to improve? What's your approach?",
        inputType: "textarea",
        placeholder: "Describe your improvement plan"
      },
      {
        id: uuidv4(),
        title: "Do",
        description: "What specific actions will you take?",
        inputType: "textarea",
        placeholder: "List the actions to implement"
      },
      {
        id: uuidv4(),
        title: "Check",
        description: "How will you measure the results?",
        inputType: "textarea",
        placeholder: "Define success metrics"
      },
      {
        id: uuidv4(),
        title: "Act",
        description: "What adjustments are needed based on results?",
        inputType: "textarea",
        placeholder: "List necessary adjustments"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "SCAMPER",
    description: "Technique for creative thinking and product improvement.",
    icon: "lightbulb",
    category: "Innovation",
    steps: [
      {
        id: uuidv4(),
        title: "Substitute",
        description: "What can you substitute in your idea/product?",
        inputType: "textarea",
        placeholder: "What elements could be replaced?"
      },
      {
        id: uuidv4(),
        title: "Combine",
        description: "What elements could you combine?",
        inputType: "textarea",
        placeholder: "What could work together?"
      },
      {
        id: uuidv4(),
        title: "Adapt",
        description: "How could you adapt this for another purpose?",
        inputType: "textarea",
        placeholder: "What modifications could work?"
      },
      {
        id: uuidv4(),
        title: "Modify",
        description: "What could you modify or magnify?",
        inputType: "textarea",
        placeholder: "What changes could improve it?"
      },
      {
        id: uuidv4(),
        title: "Put to another use",
        description: "What other uses could this have?",
        inputType: "textarea",
        placeholder: "How else could this be used?"
      },
      {
        id: uuidv4(),
        title: "Eliminate",
        description: "What could you eliminate?",
        inputType: "textarea",
        placeholder: "What could be removed?"
      },
      {
        id: uuidv4(),
        title: "Reverse",
        description: "What if you reversed the process?",
        inputType: "textarea",
        placeholder: "What would happen if reversed?"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Ladder of Inference",
    description: "Understand how we draw conclusions and avoid assumptions.",
    icon: "stairs",
    category: "Critical Thinking",
    steps: [
      {
        id: uuidv4(),
        title: "Observable Data",
        description: "What are the actual facts and data?",
        inputType: "textarea",
        placeholder: "List the observable facts"
      },
      {
        id: uuidv4(),
        title: "Selected Data",
        description: "What data are you focusing on?",
        inputType: "textarea",
        placeholder: "What caught your attention?"
      },
      {
        id: uuidv4(),
        title: "Assumptions",
        description: "What assumptions are you making?",
        inputType: "textarea",
        placeholder: "List your assumptions"
      },
      {
        id: uuidv4(),
        title: "Conclusions",
        description: "What conclusions are you drawing?",
        inputType: "textarea",
        placeholder: "What conclusions did you reach?"
      },
      {
        id: uuidv4(),
        title: "Beliefs",
        description: "How do these conclusions affect your beliefs?",
        inputType: "textarea",
        placeholder: "How do these shape your beliefs?"
      },
      {
        id: uuidv4(),
        title: "Actions",
        description: "What actions will you take based on these beliefs?",
        inputType: "textarea",
        placeholder: "What actions will you take?"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "PEE Model",
    description: "Structure arguments with Point, Evidence, and Explanation.",
    icon: "list",
    category: "Communication",
    steps: [
      {
        id: uuidv4(),
        title: "Point",
        description: "What is your main argument or point?",
        inputType: "textarea",
        placeholder: "State your main point"
      },
      {
        id: uuidv4(),
        title: "Evidence",
        description: "What evidence supports your point?",
        inputType: "textarea",
        placeholder: "Provide supporting evidence"
      },
      {
        id: uuidv4(),
        title: "Explanation",
        description: "How does the evidence support your point?",
        inputType: "textarea",
        placeholder: "Explain the connection"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Decision Matrix",
    description: "Choose between multiple options by scoring them against weighted criteria.",
    icon: "sliders",
    category: "Decision Making",
    steps: [
      {
        id: uuidv4(),
        title: "List Options",
        description: "List all the options you are considering (comma separated).",
        inputType: "textarea",
        placeholder: "e.g., Center A, Center B, Center C"
      },
      {
        id: uuidv4(),
        title: "List Criteria",
        description: "List the criteria for your decision (comma separated).",
        inputType: "textarea",
        placeholder: "e.g., Reasonable cost, Good teachers, Close to home"
      },
      {
        id: uuidv4(),
        title: "Assign Weights",
        description: "Assign a weight (importance) to each criterion (comma separated, same order as above).",
        inputType: "textarea",
        placeholder: "e.g., 3, 2, 1"
      },
      {
        id: uuidv4(),
        title: "Score Each Option",
        description: "For each option, enter the score for each criterion (one option per line, scores comma separated, same order as criteria).\nExample:\n8, 8, 8 (for Center A)\n7, 7, 7 (for Center B)\n6, 6, 6 (for Center C)",
        inputType: "textarea",
        placeholder: "e.g., 8,8,8\n7,7,7\n6,6,6"
      },
      {
        id: uuidv4(),
        title: "Summary & Insights",
        description: "Review your matrix and see which option scores highest. Consider if the result matches your intuition.",
        inputType: "textarea",
        placeholder: "Write your insights or final decision here."
      }
    ]
  }
];