function OnStableStudy(studyId, tags, metadata)
    -- This function is called when a study is stable (no new instances for StableAge)
    print("--------------------------------------------------")
    print("STABLE STUDY DETECTED: " .. studyId)
    
    -- 0. DEDUPLICATION: Prevent multiple triggers
    if metadata["SatuSehat_Sent"] == "true" and metadata["AI_Processed"] == "true" then
        print("SKIPPED: Already processed and sent to SatuSehat.")
        return
    end

    -- 2. AI ANALYSIS TRIGGER (Removed Router auto-send as requested)
    if metadata["AI_Processed"] ~= "true" then
        local frontendUrl = os.getenv("FRONTEND_INTERNAL_URL") or "http://pacs-web:3001"
        local configUrl = frontendUrl .. "/api/config/ai?orthanc=1"
        local secretToken = "pacs_secret_token_2026"
        
        local handle = io.popen("wget -qO- \"" .. configUrl .. "\" 2>&1")
        local result = handle:read("*a")
        handle:close()
        
        if result ~= nil and result ~= "" then
            RestApiPut("/studies/" .. studyId .. "/metadata/AI_Processed", "true")
            if string.find(result, "AUTO") then
                local sseUrl = frontendUrl .. "/api/telegram/auto-send?secret=" .. secretToken .. "&skipTelegram=1"
                print("SIGNAL: Sending UI/Sound trigger (AUTO mode).")
                os.execute("wget --post-data='{\"studyId\":\"" .. studyId .. "\"}' --header='Content-Type: application/json' --timeout=5 --tries=1 \"" .. sseUrl .. "\" -O /dev/null 2>&1 &")
            else
                local stdNotifyUrl = frontendUrl .. "/api/telegram/auto-send?secret=" .. secretToken
                print("SIGNAL: Sending Standard Notification + Sound.")
                os.execute("wget --post-data='{\"studyId\":\"" .. studyId .. "\"}' --header='Content-Type: application/json' --timeout=5 --tries=1 \"" .. stdNotifyUrl .. "\" -O /dev/null 2>&1 &")
            end
        else
            print("WARNING: Could not fetch AI Mode, skipping AI trigger logic.")
        end
    end

    print("--------------------------------------------------")
end
