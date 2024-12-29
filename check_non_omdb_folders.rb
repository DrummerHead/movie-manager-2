#!/usr/bin/env ruby

puts "\nThese are the folders at ~/Downloads/torrent/_movies that don't have an .omdb file:\n\n"

folders = %x[ls ~/Downloads/torrent/_movies].split("\n")

folders.each do |folder|
  list = %x[ls ~/Downloads/torrent/_movies/"#{folder}"]
  if not list =~ /.*?omdb.*/
    puts folder
  end
end
