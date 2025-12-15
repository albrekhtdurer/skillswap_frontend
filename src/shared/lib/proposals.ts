const STORAGE_KEY = "userProposals";

type TUserProposals = Record<string, number[]>;

export const getUserProposals = (): TUserProposals => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as TUserProposals;
  } catch {
    return {};
  }
};

export const setUserProposals = (data: TUserProposals): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const hasProposal = (
  fromUserId: string | null | undefined,
  toUserId: number,
): boolean => {
  if (!fromUserId) return false;
  const proposals = getUserProposals();
  const list = proposals[fromUserId] ?? [];
  return list.includes(toUserId);
};

export const addProposal = (fromUserId: string, toUserId: number): void => {
  const proposals = getUserProposals();
  const list = proposals[fromUserId] ?? [];

  if (!list.includes(toUserId)) {
    proposals[fromUserId] = [toUserId, ...list];
    setUserProposals(proposals);
  }
};
