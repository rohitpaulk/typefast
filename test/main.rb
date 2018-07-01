require 'bundler'
Bundler.require(:default)

SERVER_URL = "http://localhost:3000/"

AVERAGE_WPM = 200;

def get_human_delay_ms
  average_cpm = AVERAGE_WPM * 5
  average_cps = average_cpm / 60
  delay_seconds = 1/average_cps
  delay_ms = 1000 * delay_seconds
  final = rand(2 * delay_ms)
  puts final
  final
end

def test_basic
  driver = Selenium::WebDriver.for(:firefox)
  driver.navigate.to SERVER_URL

  focus_browser

  snippet = driver.find_element(id: "raw-snippet").attribute("value")
  body = driver.find_element(css: "body")

  simulate_typing_with_mistakes(snippet) { |c| body.send_keys(c) }

  binding.pry
  driver.quit
end

def simulate_typing_with_mistakes(text, &trigger_key_block)
  text.each_char do |char|
    simulate_mistakes(trigger_key_block) if rand(30) <= 1

    trigger_key_block.call(char)
    sleep(get_human_delay_ms / 1000)
  end
end

def simulate_mistakes(trigger_key_block)
  n_mistakes = rand(10)
  mistake_keys = [*('A'..'Z')].sample(n_mistakes)

  mistake_keys.each do |char|
    trigger_key_block.call(char)
    sleep(get_human_delay_ms / 1000)
  end

  mistake_keys.each do |char|
    trigger_key_block.call(:backspace)
    sleep(0.01)
  end
end

def focus_browser
  `osascript -e 'tell app "Firefox" to activate'`
end

test_basic()
