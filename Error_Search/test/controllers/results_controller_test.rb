require "test_helper"

class ResultsControllerTest < ActionDispatch::IntegrationTest
  test "should get ResultsPage" do
    get results_ResultsPage_url
    assert_response :success
  end
end
