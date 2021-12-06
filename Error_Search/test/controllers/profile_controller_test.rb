require "test_helper"

class ProfileControllerTest < ActionDispatch::IntegrationTest
  test "should get Profile" do
    get profile_Profile_url
    assert_response :success
  end
end
