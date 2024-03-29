"use client";

import { Pencil } from "lucide-react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { InfoModal } from "./info-modal";
import { Skeleton } from "../ui/skeleton";

interface InfoCardProps {
  name: string;
  thumbnailUrl: string | null;
  hostIdentity: string;
  viewerIdentity: string;
}

export const InfoCard = ({
  name,
  thumbnailUrl,
  hostIdentity,
  viewerIdentity,
}: InfoCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;
  //  this card is constructed so that only the host can get to view the stream information
  //  for anyone other than the host this card returns null
  if (!isHost) {
    return null;
  }

  return (
    <div className="px-4">
      <div className="rounded-xl bg-background">
        <div className="flex items-center gap-x-2.5 p-4">
          <div className="rounded-md bg-blue-600 h-auto w-auto p-2">
            {/* get the hover effect on the pencil for better viewing experience */}
            <Pencil className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm lg:text-lg font-semibold capitalize">
              Edit your stream info
            </h2>
            <p className="text-muted-foreground text-xs lg:text-sm">
              Maximize your visibility
            </p>
          </div>
          <InfoModal initialName={name} initialThumbnailUrl={thumbnailUrl} />
        </div>
        <Separator />
        <div className="p-4 lg:p-6 space-y-4">
          <h3 className="text-sm text-muted-foreground mb-2">Name</h3>
          <p className="text-sm font-semibold">{name}</p>
        </div>
        <div className="p-4 lg:p-6 space-y-4">
          <h3 className="text-sm text-muted-foreground mb-2">Thumbnail</h3>
          {thumbnailUrl && (
            <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
              <Image
                fill
                src={thumbnailUrl}
                alt={name}
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const InfoCardSkeleton = () => {
  return (
    <div className="px-4">
      <div className="rounded-xl bg-background">
        <div className="flex items-center gap-x-2.5 p-4">
          <Skeleton className="rounded-md bg-blue-600 h-10 w-10 p-2" />
          <div>
            <Skeleton className="h-6 w-48 mb-2" /> {/* Placeholder for title */}
            <Skeleton className="h-4 w-32" /> {/* Placeholder for subtitle */}
          </div>
          {/* Placeholder for InfoModal if needed */}
        </div>
        <Separator />
        <div className="p-4 lg:p-6 space-y-4">
          <Skeleton className="h-4 w-16 mb-2" />{" "}
          {/* Placeholder for "Name" label */}
          <Skeleton className="h-6 w-full" />{" "}
          {/* Placeholder for name content */}
        </div>
        <div className="p-4 lg:p-6 space-y-4">
          <Skeleton className="h-4 w-24 mb-2" />{" "}
          {/* Placeholder for "Thumbnail" label */}
          <Skeleton className="h-[200px] w-full md:w-[200px]" />{" "}
          {/* Placeholder for thumbnail */}
        </div>
      </div>
    </div>
  );
};
