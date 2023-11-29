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

// CALENDAR MANAGER

export type CalendarManageEvents = {
    totalCount: number;
    items: ItemsCalendarManage[];
}

export type ItemsCalendarManage = {
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

// *************

// Upload Image in CREATE CALENDAR
export type UploadImage = {
    file: string;
}

// **************

// GET Calendar By ID in Manage Calendar
export type GetCalendarById = {
    sort: number;
    id: string;
    name: string;
    cover: string;
    avatar: string;
    color: string;
    publicURL: string;
    lat: string;
    long: string;
    addressName: string;
    totalSubcribed: number
}
// **************

// GET LiST Event BY CALENDAR ID
export type GetListEventByCalendarId = {
    id: string;
    startDate: string;
    endDate: string;
    addressName: string;
    lat: string;
    long: string;
    capacity: number
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
    section: SectionByEvent[];
    calendarId: string;
}

export type SectionByEvent = {
    id: string;
    startDate: string;
}

// ******************

// GET EVENT DETAILS    

export type EventDetailModels = {
    sort: number
    id: string
    startDate: string
    endDate: string
    addressName: string
    lat: string
    long: string
    capacity: number
    isOverCapacity: boolean
    cover: string
    name: string
    theme: string
    color: string
    fontSize: number
    instructions: string
    isMultiSection: true
    duration: number
    totalGuest: number
    calendarId: string
    isLive: boolean
}

// CREATE EVENT MODEL
export type CreateEventModel = {
    startDate: string
    endDte: string
    addressName: string
    lat: string
    long: string
    capacity: number
    isOverCapacity: boolean
    cover: string
    name: string
    theme: string
    color: string
    fontSize: number
    instructions: string
    isMultiSection: boolean
    duration: number
    calendarId: string
}
// ****************

// LIST EVENT BY USER
export type ListEventByUser = {
    id: string
    startDate: string
    endDate: string
    addressName: string
    lat: string
    long: string
    capacity: number
    isOverCapacity: boolean
    cover: string
    name: string
    theme: string
    color: string
    fontSize: number
    instructions: string
    isMultiSection: boolean
    duration: number
    totalGuest: number
    calendarId: string
    isHost: boolean
    status: string
    sorted: number
}