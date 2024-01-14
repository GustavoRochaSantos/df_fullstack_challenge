import { Avatar, Input, Button, TextArea } from "@/components";
import {
  Gif,
  ListDashes,
  Smiley,
  CalendarBlank,
  MapPin,
  Image,
} from "@phosphor-icons/react/dist/ssr";
import React from "react";

interface Params {}

const NewPostSection = ({}: Params) => {
  return (
    <div id="new-post-wrapper" className="border-b-2 border-gray-100 py-2 mb-2">
      <div className="flex gap-3 mb-3">
        <div>
          <Avatar />
        </div>
        <TextArea id="new-post" placeholder="O que está acontecendo?" />
      </div>

      <div id="actions" className="flex justify-between">
        <div id="icons" className="flex p-4 gap-2">
          <Image size={18} className="text-blue-400" />
          <Gif size={18} className="text-blue-400" />
          <ListDashes size={18} className="text-blue-400" />
          <Smiley size={18} className="text-blue-400" />
          <CalendarBlank size={18} className="text-blue-400" />
          <MapPin size={18} className="text-blue-400" />
        </div>
        <Button>Postar</Button>
      </div>
    </div>
  );
};

export default NewPostSection;
