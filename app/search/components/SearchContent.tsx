"use client";

import { GiDuration } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ListItem from "@/components/ListItem";
import { genres } from "@/data/genre";
import MoreGenreButton from "@/components/MoreGenreButton";
import { useMediaQuery } from "react-responsive";

interface SearchContentProps {
  books: any;
}

const SearchContent: React.FC<SearchContentProps> = ({ books }) => {
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const handleClick = (id: any) => {
    router.push(`/${id}`);
  };

  if (!books) {
    return (
      <div
        className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-4 mx-[1.5rem]"
      >
        {genres.map((genre) => (
          <ListItem
            key={genre.id}
            name={genre.title}
            image={genre.img}
            href={genre.slug}
          />
        ))}
        <MoreGenreButton
          leftIcon={true}
          title={"More Genres..."}
          route={"/genres"}
        />
      </div>
    );
  }

  if (books?.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No Books Found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full px-0 sm:px-3 md:px-6 mb-[7rem]">
      {books.map((book: any) => (
        <div
          key={book.id}
          className="
          flex 
          items-center
          gap-x-5 
          cursor-pointer 
          hover:bg-zinc-800/50 
          w-full 
          p-4 
          rounded-md
          shadow-lg 
          hover:shadow-xl 
          outline-none 
        "
          onClick={() => handleClick(book.id)}
        >
          <div
            className="
          relative 
          flex
          justify-between
          rounded-md 
          h-[52px] 
          w-full
        "
          >
            <div className="flex flex-col gap-y-1">
              <p className="text-white sm:text-xl text-md font-bold">
                {isMobile && book.name.length > 37
                  ? `${book.name.substring(0, 37)}...`
                  : book.name}
              </p>
              <p className="text-zinc-400 sm:text-md text-sm font-medium">
                By {book.author.firstName + " " + book.author.lastName}
              </p>
            </div>
            <div className="flex flex-col gap-y-1 items-end">
              <p className="text-white text-sm font-light">{book.language}</p>
              <p className="text-zinc-400 text-md flex gap-2 items-center font-medium">
                {book.duration}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
