require "test_helper"

class SearchControllerTest < ActionDispatch::IntegrationTest
  test "should get Search" do
    get search_Search_url
    assert_response :success
  end
end
