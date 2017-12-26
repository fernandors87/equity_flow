# frozen_string_literal: true

require "rails_helper"

RSpec.describe "EquityClient", type: :feature, js: true do

  before do
    create_list(:deal, 3)
  end

  let(:deals) { Deal.all }

  it "works" do
    visit "/"
    puts "*" * 80
    p page.evaluate_script("console.log(2)")
    p page.driver.browser.manage.logs.get("browser")
    puts "*" * 80
    expect(page).to have_content 'Hello'
  end
end
