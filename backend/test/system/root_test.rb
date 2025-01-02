require "application_system_test_case"

class RootPageTest < ApplicationSystemTestCase
  test "visiting the root path displays the expected content in a browser" do
    visit root_path

    assert_selector "h4", text: "Event Planner" 
    click_on  "Create New Event" 
    sleep 5
  end

  test "create event button opens modal" do
    visit root_path

    click_on  "Create New Event" 
    assert_selector "h2", text: "Event"
  end

  test "create new event" do
    visit root_path

    click_on  "Create New Event" 
    
    find('[testing="title"]').set("New Event Title")
    find('[testing="desc"]').set("Event Desc")
    find('[testing="loc"]').set("Event Location")
    find('[testing="image"]', visible: false).attach_file(Rails.root.join("test/fixtures/files/cat.jpg"))

    click_on  "Confirm" 
    sleep 1
    visit root_path
    assert_selector "h4", text: "Event Planner" 
  end
end