-- Drop tables if they exist (in correct dependency order)
DROP TABLE IF EXISTS user_responses CASCADE;
DROP TABLE IF EXISTS user_models CASCADE;
DROP TABLE IF EXISTS model_steps CASCADE;
DROP TABLE IF EXISTS mental_models CASCADE;

-- Create mental_models table
CREATE TABLE mental_models (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50) NOT NULL,
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create model_steps table
CREATE TABLE model_steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_id UUID REFERENCES mental_models(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    input_type VARCHAR(20) NOT NULL CHECK (input_type IN ('text', 'textarea', 'multiple-choice', 'scale')),
    placeholder TEXT,
    step_order INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create user_models table
CREATE TABLE user_models (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    model_id UUID REFERENCES mental_models(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create user_responses table
CREATE TABLE user_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_model_id UUID REFERENCES user_models(id) ON DELETE CASCADE,
    step_id UUID REFERENCES model_steps(id) ON DELETE CASCADE,
    response TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Insert the 10 mental models
INSERT INTO mental_models (name, description, icon, category) VALUES
('5 WHYs Analysis', 'Identify the root cause of a problem by asking "why" five times in succession.', 'help-circle', 'Problem Solving'),
('SWOT Analysis', 'Evaluate strengths, weaknesses, opportunities, and threats.', 'layout-dashboard', 'Strategic Planning'),
('Eisenhower Matrix', 'Prioritize tasks based on urgency and importance.', 'grid', 'Productivity'),
('Problem Tree', 'Visualize and analyze causes and consequences of problems.', 'git-branch', 'Problem Analysis'),
('SMART Goals', 'Set specific, measurable, achievable, relevant, and time-bound goals.', 'target', 'Goal Setting'),
('PDCA Cycle', 'Plan, Do, Check, Act cycle for continuous improvement.', 'refresh-cw', 'Process Improvement'),
('SCAMPER', 'Technique for creative thinking and product improvement.', 'lightbulb', 'Innovation'),
('Decision Matrix', 'Compare options based on weighted criteria.', 'layout-grid', 'Decision Making'),
('Ladder of Inference', 'Understand how we draw conclusions and avoid assumptions.', 'stairs', 'Critical Thinking'),
('PEE Model', 'Structure arguments with Point, Evidence, and Explanation.', 'list', 'Communication');

-- Insert steps for each model (example for 5 WHYs)
INSERT INTO model_steps (model_id, title, description, input_type, placeholder, step_order) 
SELECT 
    id,
    'Define the Problem',
    'Clearly state the problem you''re trying to solve.',
    'textarea',
    'What problem are you trying to solve?',
    1
FROM mental_models WHERE name = '5 WHYs Analysis';

-- Add more steps for 5 WHYs
INSERT INTO model_steps (model_id, title, description, input_type, placeholder, step_order)
SELECT 
    mental_models.id,
    steps.title,
    steps.description,
    'textarea',
    steps.placeholder,
    steps.order_num
FROM mental_models
CROSS JOIN (
    VALUES 
        ('First Why', 'Ask why this problem occurs.', 'Why does this problem occur?', 2),
        ('Second Why', 'Based on your first answer, ask why again.', 'Why does that happen?', 3),
        ('Third Why', 'Keep going deeper. Ask why again.', 'Why does that happen?', 4),
        ('Fourth Why', 'Continue asking why to get closer to the root cause.', 'Why does that happen?', 5),
        ('Fifth Why', 'This should get you to the root cause.', 'Why does that happen?', 6)
) AS steps(title, description, placeholder, order_num)
WHERE mental_models.name = '5 WHYs Analysis';

-- Create indexes for better performance
CREATE INDEX idx_mental_models_category ON mental_models(category);
CREATE INDEX idx_model_steps_model_id ON model_steps(model_id);
CREATE INDEX idx_user_models_user_id ON user_models(user_id);
CREATE INDEX idx_user_responses_user_model_id ON user_responses(user_model_id);