function ReceivedInstanceFilter(dicom, metadata, origin)
   -- Guard against empty dicom or metadata
   if dicom == nil then return true end

   -- Safely decode DICOM tags
   local status, response = pcall(function()
      return RestApiPost('/tools/decode', dicom)
   end)

   if not status or response == nil or response == '' then
      return true
   end

   local status2, info = pcall(function()
      return ParseJson(response)
   end)

   if not status2 or info == nil or info['MainDicomTags'] == nil then
      return true
   end

   local accession = info['MainDicomTags']['AccessionNumber']
   local studyInstanceUID = info['MainDicomTags']['StudyInstanceUID']

   -- If AccessionNumber is missing, we allow it to proceed
   if accession == nil or accession == '' then
      return true
   end

   -- Search for existing studies with this AccessionNumber
   -- We use a simpler find query
   local query = DumpJson({
      Level = 'Study',
      Query = {
         AccessionNumber = accession
      }
   })
   
   local status3, matches_raw = pcall(function()
      return RestApiPost('/tools/find', query)
   end)

   if not status3 or matches_raw == nil then
      return true
   end

   local matches = ParseJson(matches_raw)
   
   for _, studyId in ipairs(matches) do
      local existingStudyStatus, existingStudyRaw = pcall(function()
         return RestApiGet('/studies/' .. studyId)
      end)

      if existingStudyStatus and existingStudyRaw ~= nil then
         local existingStudy = ParseJson(existingStudyRaw)
         if existingStudy['MainDicomTags'] ~= nil then
            local existingStudyUID = existingStudy['MainDicomTags']['StudyInstanceUID']
            
            -- Rejek jika UID berbeda (duplikat AccessionNumber)
            if existingStudyUID ~= studyInstanceUID then
               print('REJECTED DUPLICATE: AccessionNumber "' .. accession .. '" already exists in study ' .. existingStudyUID)
               return false
            end
         end
      end
   end

   return true
end
