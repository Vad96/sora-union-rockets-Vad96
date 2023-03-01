export interface GithubUser {
  avatarUrl: string;
  eventsUrl: string;
  followersUrl: string;
  followingUrl: string;
  gistsUrl: string;
  gravatarId: string;
  htmlUrl: string;
  id: number;
  login: string;
  nodeId: string;
  organizationsUrl: string;
  receivedEventsUrl: string;
  reposUrl: string;
  score: number;
  siteAdmin: boolean;
  starredUrl: string;
  subscriptionsUrl: string;
  type: string;
  url: string;
}

export interface RocketCard {
  id: string;
  description: string;
  name: string;
  title: string;
  user: GithubUser | null;
}

export interface RocketsListState {
  rocketsList: RocketCard[];
  addRocket: (rocket: RocketCard) => void;
  removeRocket: (rocket: RocketCard) => void;
  editRocket: (rocket: RocketCard) => void;
}

export interface SelectedOption {
  label: string;
  value: GithubUser;
}
