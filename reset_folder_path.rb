#!/usr/bin/env ruby

movie_paths = ['..', '/Volumes/DrummerDiskOSX/2016-01-31-macbook-pro-2012-backup/Downloads/Utorrent/_movies']

def find_paths paths
  paths.map do |path|
    %x[find #{path} -name "*.omdb"].split("\n").reject{ |path| path =~ /_watched/}
  end.reduce(:+)
end

omdb_paths = find_paths movie_paths

omdb_paths.each do |path|
  full_pwd = %x[realpath "#{path}"]
    .gsub(/tt[\d]*\.omdb$/, '')
    .gsub(/\n$/, '')

  content = File.read path
  new_content = content
    .gsub(/"pwd" : "[^"]*"/, "\"pwd\" : \"#{full_pwd}\"")
  File.open(path, 'w') do |file_content|
    file_content.write(new_content)
  end

  puts "\n========================\n"
  puts "\nFull path:"
  puts full_pwd
  puts "\nPrevious content:"
  puts content
  puts "\nContent with new path:"
  puts new_content
end

