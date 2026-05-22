import { customLog } from "./index";

// ===========================
// 숫자 포맷
// ===========================

export const addNumberSeparator = (number: number | string): string => {
  const n = Number(number);
  if (n >= 10000) {
    const displayNumber = (n / 10000).toFixed(1);
    return displayNumber.endsWith(".0")
      ? displayNumber.slice(0, -2) + "만"
      : displayNumber + "만";
  }
  return n.toLocaleString();
};

export const addNumberSeparatorAll = (number: number | string): string => {
  const n = Number(number);
  if (n >= 10000) {
    const displayNumber = (n / 10000).toFixed(1);
    return displayNumber.endsWith(".0")
      ? displayNumber.slice(0, -2) + "만"
      : displayNumber + "만";
  } else if (n >= 1000) {
    const displayNumber = (n / 1000).toFixed(1);
    return displayNumber.endsWith(".0")
      ? displayNumber.slice(0, -2) + "천"
      : displayNumber + "천";
  }
  return n.toLocaleString();
};

// ===========================
// 날짜/시간 포맷
// ===========================

const extractDateTime = (text: string): Date => {
  const [dateStr, timeStr] = text.split(" ");
  const dateTimeStr = `${dateStr}T${timeStr}Z`;
  return new Date(dateTimeStr);
};

export const getElapsedTime = (
  broadcastStartTimeText: string,
  type: "HH:MM:SS" | "HH:MM"
): string => {
  const broadcastStartTime = extractDateTime(broadcastStartTimeText);
  broadcastStartTime.setHours(broadcastStartTime.getHours() - 9);
  const currentTime = new Date();
  const timeDiff = currentTime.getTime() - broadcastStartTime.getTime();

  const secondsElapsed = Math.floor(timeDiff / 1000);
  const hoursElapsed = Math.floor(secondsElapsed / 3600);
  const minutesElapsed = Math.floor((secondsElapsed % 3600) / 60);
  const remainingSeconds = secondsElapsed % 60;
  let formattedTime = "";

  if (type === "HH:MM:SS") {
    formattedTime = `${String(hoursElapsed).padStart(2, "0")}:${String(minutesElapsed).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  } else if (type === "HH:MM") {
    if (hoursElapsed > 0) {
      formattedTime = `${String(hoursElapsed)}시간 `;
    }
    formattedTime += `${String(minutesElapsed)}분`;
  }
  return formattedTime;
};

export const timeSince = (serverTimeStr: string): string => {
  const toKSTDate = (str: string): Date => {
    const iso = str.replace(" ", "T") + "+09:00";
    return new Date(iso);
  };

  const postTime = toKSTDate(serverTimeStr).getTime();
  const now = Date.now();

  const seconds = Math.floor((now - postTime) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 365) return `${Math.floor(days / 365)}년 전`;
  if (days > 30) return `${Math.floor(days / 30)}개월 전`;
  if (days > 0) return `${days}일 전`;
  if (hours > 0) return `${hours}시간 전`;
  if (minutes > 0) return `${minutes}분 전`;
  return `${seconds}초 전`;
};

export const checkIfTimeover = (timestamp: number): boolean => {
  const now = Date.now();
  const inputTime = timestamp * 1000;
  return now - inputTime > 86400000;
};

// ===========================
// 카테고리
// ===========================

import type { I_Category, I_CategoryData } from "@Types/index.d";

export const getCategoryName = (
  targetCateNo: string,
  savedCategory: I_CategoryData | null
): string => {
  if (!savedCategory) return "";

  const searchCategory = (categories: I_Category[]): string | undefined => {
    for (const category of categories) {
      if (category.cate_no === targetCateNo) {
        return category.cate_name;
      }
      if (category.child?.length) {
        const result = searchCategory(category.child);
        if (result) return result;
      }
    }
    return undefined;
  };

  return searchCategory(savedCategory.CHANNEL.BROAD_CATEGORY) ?? "";
};

export const getCategoryNo = (
  targetCateName: string,
  savedCategory: I_CategoryData | null
): string => {
  if (!savedCategory) return "";

  const searchCategory = (categories: I_Category[]): string | undefined => {
    for (const category of categories) {
      if (category.cate_name === targetCateName) {
        return category.cate_no;
      }
      if (category.child?.length) {
        const result = searchCategory(category.child);
        if (result) return result;
      }
    }
    return undefined;
  };

  return searchCategory(savedCategory.CHANNEL.BROAD_CATEGORY) ?? "";
};

// ===========================
// 정렬 유틸리티
// ===========================

export const stableRandomOrder = (() => {
  const randomMap = new WeakMap<object, number>();

  return (a: object, b: object): number => {
    if (!randomMap.has(a)) randomMap.set(a, Math.random());
    if (!randomMap.has(b)) randomMap.set(b, Math.random());
    return randomMap.get(a)! - randomMap.get(b)!;
  };
})();
