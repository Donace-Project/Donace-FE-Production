export type AppUser = {
    id: string;
    userName: string;
    email: string;
    avatar: string;
    bio: string;
    instagram: string;
    twitter: string;
    youtube: string;
    tiktok: string;
    linkedIn: string;
    website: string;
};

// PROFILE

export type UserProfile = {
    code: string;
    success: boolean;
    result: ResultUserProfile;
    pageInfo: any;
}

export type ResultUserProfile = {
    id: string
    userName: string
    email: string
    avatar: string
    bio: string
    instagram: string
    twitter: string
    youtube: string
    tiktok: string
    linkedIn: string
    website: string
}

export type EventsProfile = {
    totalCount: number;
    items: ItemEventsProfile[];
}

export type ItemEventsProfile = {
    id: string;
    startDate: string;
    endDate: string;
    addressName: string;
    lat: string;
    long: string;
    capacity: number;
    isOverCapacity: boolean;
    cover: string;
    name: string;
    theme: string;
    color: string;
    fontSize: number;
    instructions: string;
    isMultiSection: boolean;
    duration: number;
    totalGuest: number;
    calendarId: string;
    isLive: boolean;
}

// ***** END EXPORT PROFILE
