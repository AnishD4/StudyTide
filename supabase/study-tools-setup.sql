-- Study Tools Tables for Vercel Deployment
-- Run this in your Supabase SQL Editor

-- Assignments table
CREATE TABLE IF NOT EXISTS public.assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  due_date DATE,
  difficulty INTEGER DEFAULT 5 CHECK (difficulty >= 1 AND difficulty <= 10),
  estimated_minutes INTEGER DEFAULT 60,
  priority INTEGER DEFAULT 5 CHECK (priority >= 1 AND priority <= 10),
  completed BOOLEAN DEFAULT FALSE,
  class_id UUID REFERENCES public.classes(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Flashcards table
CREATE TABLE IF NOT EXISTS public.flashcards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  topic TEXT NOT NULL,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Study guides table
CREATE TABLE IF NOT EXISTS public.study_guides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  topic TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_guides ENABLE ROW LEVEL SECURITY;

-- RLS Policies for assignments
CREATE POLICY "Users can view their own assignments"
  ON public.assignments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own assignments"
  ON public.assignments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own assignments"
  ON public.assignments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own assignments"
  ON public.assignments FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for flashcards
CREATE POLICY "Users can view their own flashcards"
  ON public.flashcards FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own flashcards"
  ON public.flashcards FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own flashcards"
  ON public.flashcards FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for study_guides
CREATE POLICY "Users can view their own study guides"
  ON public.study_guides FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own study guides"
  ON public.study_guides FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own study guides"
  ON public.study_guides FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own study guides"
  ON public.study_guides FOR DELETE
  USING (auth.uid() = user_id);

-- AI Chat History table
CREATE TABLE IF NOT EXISTS public.ai_chat_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE,
  message_type TEXT NOT NULL CHECK (message_type IN ('user', 'assistant')),
  content TEXT NOT NULL,
  context TEXT, -- JSON string with additional context
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security for AI chat
ALTER TABLE public.ai_chat_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ai_chat_history
CREATE POLICY "Users can view their own chat history"
  ON public.ai_chat_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chat messages"
  ON public.ai_chat_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own chat history"
  ON public.ai_chat_history FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_assignments_user_id ON public.assignments(user_id);
CREATE INDEX IF NOT EXISTS idx_assignments_due_date ON public.assignments(due_date);
CREATE INDEX IF NOT EXISTS idx_assignments_completed ON public.assignments(completed);
CREATE INDEX IF NOT EXISTS idx_flashcards_user_id ON public.flashcards(user_id);
CREATE INDEX IF NOT EXISTS idx_flashcards_topic ON public.flashcards(topic);
CREATE INDEX IF NOT EXISTS idx_study_guides_user_id ON public.study_guides(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_chat_user_id ON public.ai_chat_history(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_chat_assignment_id ON public.ai_chat_history(assignment_id);
CREATE INDEX IF NOT EXISTS idx_ai_chat_created_at ON public.ai_chat_history(created_at DESC);

