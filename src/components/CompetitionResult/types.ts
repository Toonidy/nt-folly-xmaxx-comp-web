/** GQL Enum for user statuses. */
export enum MembershipType {
	BASIC = "BASIC",
	GOLD = "GOLD",
}

/** GQL Enum User Status values. */
export enum UserStatus {
	NEW = "NEW",
	ACTIVE = "ACTIVE",
	DISQUALIFIED = "DISQUALIFIED",
}

/** Competition Status Values. */
export enum CompetitionStatus {
	DRAFT = "DRAFT",
	STARTED = "STARTED",
	FINISHED = "FINISHED",
	FAILED = "FAILED",
}

/** Competition Rewards gql object. */
export interface Competition {
	id: string
	status: CompetitionStatus
	multiplier: number
	startAt: Date
	finishAt: Date
	leaderboard: CompetitionUser[]
	grindRewards: CompetitionPrize[]
	pointRewards: CompetitionPrize[]
	speedRewards: CompetitionPrize[]
	accuracyRewards: CompetitionPrize[]
}

/** Competition Prize gql object. */
export interface CompetitionPrize {
	rank: number
	points: number
}

/** Competition User gql obj. */
export interface CompetitionUser {
	id: string
	speedRank: number
	speedScore: number
	speedReward: number
	accuracyRank: number
	accuracyScore: number
	accuracyReward: number
	grindRank: number
	grindScore: number
	grindReward: number
	pointRank: number
	pointScore: number
	pointReward: number
	user: {
		username: string
		displayName: string
		status: UserStatus
		membershipType: MembershipType
	}
}

/** Leaderboard Table Record Data. */
export interface LeaderboardEntry {
	username: string
	displayName: string
	totalPoints: number
	membershipType: MembershipType
}
