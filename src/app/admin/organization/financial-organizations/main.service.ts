class SubService {
  systemName: string;
  displayName: string;
}

export class MainService {
  systemName: string;
  displayName: string;
  subServices: SubService[];
}
