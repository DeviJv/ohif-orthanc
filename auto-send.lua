function OnStableStudy(studyId, tags, metadata)
    -- This function is called when a study is stable (no new instances for StableAge)
    print("--------------------------------------------------")
    print("STABLE STUDY DETECTED: " .. studyId)
    
    -- 0. DEDUPLICATION: Prevent multiple triggers
    if metadata["AI_Processed"] == "true" then
        print("SKIPPED: Already processed.")
        return
    end

    -- Mark as processed to handle fallbacks
    RestApiPost("/studies/" .. studyId .. "/metadata/AI_Processed", "true")

    -- 1. Check AI Mode
    local frontendUrl = os.getenv("FRONTEND_INTERNAL_URL") or "http://pacs-web:3001"
    local configUrl = frontendUrl .. "/api/config/ai?orthanc=1"
    local secretToken = "pacs_secret_token_2026"
    
    local handle = io.popen("wget -qO- \"" .. configUrl .. "\" 2>&1")
    local result = handle:read("*a")
    handle:close()
    
    if result == nil or result == "" then
        print("ERROR: Could not fetch AI Mode.")
        return
    end

    -- 2. Clean Logic
    -- AI Analysis is now triggered by the Frontend for Browser Uploads.
    -- Orthanc Lua only handles standard notifications and Sound.

    if string.find(result, "AUTO") then
        -- In AUTO: Frontend handles the Analysis + Telegram.
        -- Orthanc only sends the Sound/UI Signal to refresh the list.
        local sseUrl = frontendUrl .. "/api/telegram/auto-send?secret=" .. secretToken .. "&skipTelegram=1"
        print("SIGNAL: Sending UI/Sound trigger (AUTO mode).")
        os.execute("wget --post-data='{\"studyId\":\"" .. studyId .. "\"}' --header='Content-Type: application/json' --timeout=5 --tries=1 \"" .. sseUrl .. "\" -O /dev/null 2>&1 &")
    else
        -- In MANUAL/OFF: Normal behavior (Sound + Standard Notification).
        local stdNotifyUrl = frontendUrl .. "/api/telegram/auto-send?secret=" .. secretToken
        print("SIGNAL: Sending Standard Notification + Sound.")
        os.execute("wget --post-data='{\"studyId\":\"" .. studyId .. "\"}' --header='Content-Type: application/json' --timeout=5 --tries=1 \"" .. stdNotifyUrl .. "\" -O /dev/null 2>&1 &")
    end

    print("--------------------------------------------------")
end
