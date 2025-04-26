import React, { useState } from 'react';
import { ChartSection, StatsSection, WorkoutForm, WorkoutList } from './WorkoutComponents';
import styles from './workout.module.css';

const initialWorkouts = [
  // أمثلة تمارين افتراضية
  { id: 1, name: 'Running', duration: 30, calories: 300, date: new Date().toISOString().substr(0, 10) },
  { id: 2, name: 'Cycling', duration: 40, calories: 350, date: new Date().toISOString().substr(0, 10) },
];

const Workout = () => {
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [chartPeriod, setChartPeriod] = useState('all');

  // إضافة تمرين جديد
  const handleAddWorkout = (workout) => {
    setWorkouts((prev) => [workout, ...prev]);
  };

  // حذف تمرين
  const handleDeleteWorkout = (id) => {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
  };

  // أفضل تمرين
  const bestWorkout = workouts.reduce((best, curr) => (curr.calories > (best?.calories || 0) ? curr : best), null);
  // مجموع السعرات
  const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);
  // عدد التمارين
  const totalWorkouts = workouts.length;
  // سلسلة التمارين
  const workoutStreak = 3; // يمكن تطويرها لاحقًا

  return (
    <div className={styles.workoutPage}>
      <StatsSection
        totalWorkouts={totalWorkouts}
        totalCalories={totalCalories}
        bestWorkout={bestWorkout}
        workoutStreak={workoutStreak}
      />
      <ChartSection
        workouts={workouts}
        onChartPeriodChange={(e) => setChartPeriod(e.target.value)}
        chartPeriod={chartPeriod}
      />
      <WorkoutForm onAddWorkout={handleAddWorkout} />
      <WorkoutList workouts={workouts} onDeleteWorkout={handleDeleteWorkout} />
    </div>
  );
};

export default Workout;
