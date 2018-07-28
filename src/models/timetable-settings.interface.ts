export interface TimetableSetting{
	year: number;
	school_id: string;
	cycleDays: number;
	startTimes: Date[];
	numPeriodsPerDay: number[];
	periodDurations: number[];
	numBreaks: number[];
	firstBreakTime: {startTime: Date, duraion: number}[];
	gradeStart: number;
	gradeEnd: number;
	hasRegistrationClass: boolean;
	registrationPeriodDuration: number;
	classLetters: string;
	rotationType: string;

}