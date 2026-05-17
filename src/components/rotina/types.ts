export interface RotinaTask {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  area: string;
  priority: "baixa" | "media" | "alta";
  due_date: string | null;
  due_time: string | null;
  status: "todo" | "doing" | "done";
  tags: string[];
  recurrence: string;
  anchor_verse: string | null;
  parent_task_id: string | null;
  goal_id: string | null;
  sort_order: number;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface RotinaEvent {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: string;
  color: string;
  start_at: string;
  end_at: string;
  all_day: boolean;
  recurrence: string;
  recurrence_until: string | null;
  location: string | null;
  google_event_id: string | null;
  reminder_minutes: number | null;
}

export interface RotinaHabit {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  icon: string;
  color: string;
  frequency_type: "daily" | "weekly" | "custom";
  frequency_days: number[];
  target_per_week: number | null;
  is_active: boolean;
  sort_order: number;
}

export interface RotinaHabitLog {
  id: string;
  user_id: string;
  habit_id: string;
  log_date: string;
  notes: string | null;
}

export interface RotinaPrayer {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: string;
  status: "praying" | "answered" | "paused";
  testimony: string | null;
  answered_at: string | null;
  is_pinned: boolean;
  created_at: string;
}

export interface RotinaNote {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  template_type: string | null;
  related_verses: string[];
  is_favorite: boolean;
  note_date: string;
  location: string | null;
  updated_at: string;
}

export interface RotinaGoal {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  area: string;
  target_date: string | null;
  progress_percent: number;
  current_score: number;
  parent_goal_id: string | null;
  status: "active" | "completed" | "paused";
  completed_at: string | null;
}

export interface RotinaWeeklyReview {
  id: string;
  user_id: string;
  week_start: string;
  gratitude: string | null;
  confessions: string | null;
  learnings: string | null;
  next_focus: string | null;
  week_verse: string | null;
  created_at: string;
}
