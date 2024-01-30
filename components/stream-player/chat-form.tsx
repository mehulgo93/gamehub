"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface ChatFormProps {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  isFollowing: boolean;
  isFollowersOnly: boolean;
  isDelayed: boolean;
}

export const ChatForm = ({
  onSubmit,
  value,
  onChange,
  isHidden,
  isFollowing,
  isFollowersOnly,
  isDelayed,
}: ChatFormProps) => {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);
  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
  const isDisabled =
    isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!value || isDisabled) return;
    if (isDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  };
  if (isHidden) {
    return null;
  }
  return (
    <form
      onSubmit={() => {}}
      className="flex flex-col items-center gap-y-4 p-3"
    >
      <div className="w-full">
        <Input
          onChange={() => {}}
          value={value}
          disabled={isDisabled}
          placeholder="Send a message"
          className={cn(
            "border-white/10",
            isFollowersOnly && "rounded-t-none border-t-0"
          )}
        />
      </div>
      <div className="ml-auto">
        <Button type="submit" variant="primary" size="sm" disabled={isDisabled}>
          Chat
        </Button>
      </div>
    </form>
  );
};
