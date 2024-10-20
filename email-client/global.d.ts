type EmailDetails = {
    id: string;
    from: {
        email: string;
        name: string;
    };
    date: number;
    subject: string;
    short_description: string;
}

type EmailContent = {
    id: string;
    body: string;
}

type FilterObj = {
    read: string[],
    favourites: string[],
    readStateActive: boolean,
    favouriteStateActive: boolean,
    unreadStateActive: boolean,
}

interface PaginatedApiResponse<T> {
    data: T[];
    totalCount: number;
}