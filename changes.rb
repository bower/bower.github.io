require 'set'

result = `git diff --cached _layouts | grep -e '^[-+]\\s*<' | sort`

added = Set.new
removed = Set.new

result.strip.split("\n").each do |p|
  if p.strip[0] == "+"
    added.add(p[1..-1].tr('|', '').strip)
  end

  if p.strip[0] == "-"
    removed.add(p[1..-1].tr('|', '').strip)
  end
end

puts "ADDED:\n"
puts (added - removed).to_a.join("\n")
puts "\n"
puts "REMOVED:\n"
puts (removed - added).to_a.join("\n")
puts "\n"
