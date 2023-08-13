export interface Account {
    readonly team : string;
    readonly accountId: string;
    readonly region: string;
    readonly stage: string;
    readonly airportCode: string;
}

export const Accounts: Account[] = [
    {
        team: 'team3',
        accountId: '842292639267',
        stage: 'team3',
        region: 'ap-northeast-2',
        airportCode: 'ICN',
    },
];

export function getAccountUniqueName(account: Account): string {
    return getAccountUniqueNameWithDelimiter(account, '-')
}

export function getAccountUniqueNameWithDelimiter(account: Account, delimiter: string): string {
    return `${account.team}${delimiter}${account.airportCode}`
}

export function getDevAccount(userId: string): Account | undefined {
    return Accounts.find((account: Account) => { return account.stage === account.team })
}