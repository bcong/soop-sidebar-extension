import type { I_BlockedUser, I_BlockedCategory, I_PinnedCategory } from "@Types/index.d";

// ===========================
// 유저 차단
// ===========================

export const blockUser = (
  userId: string,
  userName: string,
  currentList: I_BlockedUser[],
  onUpdate: (newList: I_BlockedUser[]) => void
): void => {
  if (currentList.some((u) => u.userId === userId)) return;

  const newList = [...currentList, { userId, userName }];
  GM_setValue("blockedUsers", JSON.stringify(newList));
  onUpdate(newList);
};

export const unblockUser = (
  userId: string,
  currentList: I_BlockedUser[],
  onUpdate: (newList: I_BlockedUser[]) => void
): void => {
  const newList = currentList.filter((u) => u.userId !== userId);
  GM_setValue("blockedUsers", JSON.stringify(newList));
  onUpdate(newList);
};

export const isUserBlocked = (
  userId: string,
  blockedUsers: I_BlockedUser[]
): boolean => blockedUsers.some((u) => u.userId === userId);

// ===========================
// 카테고리 차단
// ===========================

export const blockCategory = (
  categoryId: string,
  categoryName: string,
  currentList: I_BlockedCategory[],
  onUpdate: (newList: I_BlockedCategory[]) => void
): void => {
  if (currentList.some((c) => c.categoryId === categoryId)) return;

  const newList = [...currentList, { categoryId, categoryName }];
  GM_setValue("blockedCategories", JSON.stringify(newList));
  onUpdate(newList);
};

export const unblockCategory = (
  categoryId: string,
  currentList: I_BlockedCategory[],
  onUpdate: (newList: I_BlockedCategory[]) => void
): void => {
  const newList = currentList.filter((c) => c.categoryId !== categoryId);
  GM_setValue("blockedCategories", JSON.stringify(newList));
  onUpdate(newList);
};

export const isCategoryBlocked = (
  categoryId: string,
  blockedCategories: I_BlockedCategory[]
): boolean => blockedCategories.some((c) => c.categoryId === categoryId);

// ===========================
// 카테고리 고정
// ===========================

export const pinCategory = (
  categoryId: string,
  categoryName: string,
  currentList: I_PinnedCategory[],
  onUpdate: (newList: I_PinnedCategory[]) => void
): void => {
  if (currentList.some((c) => c.categoryId === categoryId)) return;

  const newList = [...currentList, { categoryId, categoryName }];
  GM_setValue("pinnedCategories", JSON.stringify(newList));
  onUpdate(newList);
};

export const unpinCategory = (
  categoryId: string,
  currentList: I_PinnedCategory[],
  onUpdate: (newList: I_PinnedCategory[]) => void
): void => {
  const newList = currentList.filter((c) => c.categoryId !== categoryId);
  GM_setValue("pinnedCategories", JSON.stringify(newList));
  onUpdate(newList);
};

export const isCategoryPinned = (
  categoryId: string,
  pinnedCategories: I_PinnedCategory[]
): boolean => pinnedCategories.some((c) => c.categoryId === categoryId);

// ===========================
// 메뉴 커맨드 등록
// ===========================

export const setupMenuCommands = (
  blockedUsers: I_BlockedUser[],
  blockedCategories: I_BlockedCategory[],
  pinnedCategories: I_PinnedCategory[]
): void => {
  GM_registerMenuCommand("📋 차단 목록 보기", () => {
    if (blockedUsers.length === 0 && blockedCategories.length === 0) {
      alert("차단 목록이 없습니다.");
      return;
    }

    let message = "";
    if (blockedUsers.length > 0) {
      message += "=== 차단된 유저 ===\n";
      blockedUsers.forEach((u) => {
        message += `  - ${u.userName} (${u.userId})\n`;
      });
    }
    if (blockedCategories.length > 0) {
      message += "\n=== 차단된 카테고리 ===\n";
      blockedCategories.forEach((c) => {
        message += `  - ${c.categoryName} (${c.categoryId})\n`;
      });
    }
    alert(message);
  });

  GM_registerMenuCommand("📌 고정 카테고리 보기", () => {
    if (pinnedCategories.length === 0) {
      alert("고정된 카테고리가 없습니다.");
      return;
    }

    let message = "=== 고정된 카테고리 ===\n";
    pinnedCategories.forEach((c) => {
      message += `  - ${c.categoryName} (${c.categoryId})\n`;
    });
    alert(message);
  });
};
