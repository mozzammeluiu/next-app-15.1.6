
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export type StartupCardType = {
  _id: number;
  _createdAt: string;
  views: number;
  author: {
    _id: number;
    image: string;
    name: string;
  };
  description: string;
  image: string;
  category: string;
  title: string;
};
function StartupCard({ post }: { post: StartupCardType }) {
  const {
    _createdAt,
    views,
    author:{
        _id: authorId,
        name:authorName,
        image:authorImage
    },
    title,
    _id,
    category,
    description,
    image
  } = post;

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5 text-black">
        <div className="flex-1">
          <Link href={`/user/${authorId}`}>
            <p className="text-16-medium line-clamp-1">{authorName}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${authorId}`}>
          <Image
            src={authorImage!}
            alt={authorName!}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>

        <Image width={500} height={500} src={image} alt="placeholder" className="startup-card_img" />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
}

export default StartupCard;
