function OnStableStudy(studyId, tags, metadata)
    -- This function is called when a study is stable (no new instances for 5s)
    print("New stable study detected: " .. studyId)
    
    -- Target the internal Next.js API (configurable via ENV)
    local frontendUrl = os.getenv("FRONTEND_INTERNAL_URL") or "http://pacs-web:3001"
    local secret = "pacs_secret_token_2026"
    local url = frontendUrl .. "/api/telegram/auto-send?secret=" .. secret
    
    local body = '{"studyId": "' .. studyId .. '"}'
    
    print("Triggering background automated Telegram send via wget...")
    
    -- Using wget to post data in background
    -- --header="Content-Type: application/json"
    -- --post-data='...'
    -- -O /dev/null
    -- & (background)
    local command = "wget --header=\"Content-Type: application/json\" --post-data='" .. body .. "' \"" .. url .. "\" -O /dev/null &"
    
    os.execute(command)
    print("Background wget command dispatched.")
end
