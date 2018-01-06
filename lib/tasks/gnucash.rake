# frozen_string_literal: true

require "gnucash"
require_relative "../gnucash_importer"

desc "Seed the database with accounts, transactions and splits from the Gnucash file."
task :gnucash, [:file] => :environment do |_task, args|
  unless Rails.env.development?
    puts "For safety reasons this rake task will run only on development enviroment."
    exit(1)
  end

  unless args[:file]
    puts "Usage: rake gnucash[/path/to/gnucash/file]"
    exit(1)
  end

  puts "This process will replace all accounts, deals and splits with a potential data loss."
  puts "Type \"yes\" if you're sure you want to proceed."
  exit unless STDIN.gets.chomp == "yes"

  begin
    logger = ActiveSupport::Logger.new(STDOUT)
    ActiveRecord::Base.logger, original = logger, ActiveRecord::Base.logger

    book = Gnucash.open(args[:file])
    accounts = GnucashImporter.import_accounts!(book)
    GnucashImporter.import_transactions!(book, accounts)
  rescue e
    ActiveRecord::Base.logger = original
    raise e
  end
end
