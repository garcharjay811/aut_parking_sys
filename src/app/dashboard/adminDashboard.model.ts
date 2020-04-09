export interface Populate {
    inst_name1: string,
    inst_name2: string,
    inst_name3: string,
    inst_name4: string,
    group_name: string,
    sport_name: string
}
export interface InstituteAndSO {
    inst_name: string,
    address: string,
    so_name: string,
    phone: Number
}

export interface Institute {
    inst_name: string,
    address: string
}

export interface Sport {
    sport_name: string,
    sport_type: string
}

export interface Referee {
    referee_name: string,
    sport_name: string,
    phone: Number
}

export interface Participant {
    roll_id: string,
    name: string,
    inst_name: string,
    sport_name: string,
    phone: Number
}

export interface Group {
    group_name: string,
    sport_name: string,
    group_winner: string
}

export interface TeamMatch {
    match_id: Number,
    institute1: string,
    institute2: string,
    sport_name: string,
    group_name: string,
    venue_name: string,
    date: Date,
    referee_id: Number,
    winner: string
}

export interface Venue {
    venue_name: string,
    address: string,
}