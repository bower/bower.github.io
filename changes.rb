require 'set'

result = `git diff --cached _layouts | grep -e '^[-+]<' | sort`

added = Set.new
removed = Set.new

result.strip.split("\n").each do |p|
  if p[0] == "+"
    added.add(p[1..-1].strip)
  end

  if p[0] == "-"
    removed.add(p[1..-1].strip)
  end
end

puts "ADDED:\n"
puts (added - removed).to_a.join("\n")
puts "\n"
puts "REMOVED:\n"
puts (removed - added).to_a.join("\n")
puts "\n"
