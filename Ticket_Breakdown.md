# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Estimations are dependant on the complexity of the code structure and also how the changes are managed.

1. Database Change Ticket:
-Add new field to the Shifts table to hold the custom ID.
-This field accepts null as it will be initially empty. 
-Generate db migration file.

Acceptance Criteria:
-The Shifts table should have a new field called AgentCustomId.
-The new field should accept null.
-The value must be 5 characters in length (Assumption).

Estimation: 1Hrs

2. Support showing and editing the custom ID by facility
-Create new field in UI available for facilities to edit.
-On submission, the value supplied in this field through UI should be sent to the save API which in terns saves it in the newly created field in the Shifts table in the database.
-Retrieve the value of this field in the get shift API and show it in UI. 

Acceptance Criteria:
-Facility admin should have a new field called Agent Custom ID in the Agent screen (Assumption).
-Facility admin should have the ability to edit this field (only facility admin, no other roles exist - Assumption).
-The field will be initially empty in case it was not filled before by the Facility Admin for a specific agent.
-The field should show the already assigned value by the facility admin for a specific agent.
-The value must be unique per Agent & Facility.
-The value must be 5 characters in length (Assumption).

-Estimation: 3Hrs

3. Modify the reporting feature to show the custom ID
-Modify getShiftsByFacility function to return the custom ID field per shift.
-Modify generateReport to show the returned custom ID in the appropriate place.
-If the value is null then don't show it at all.

Acceptance Criteria:
-The getShiftsByFacility function should return the AgentCustomId field as part of each shift object.
-The generateReport function should use the returned AgentCustomId value and show it in the report in the top left corner next to the agent name (Assumption).
-If AgentCustomId has no value then don't show it at all.

-Estimation: 2Hrs

4. Test the new feature
-Assign an agent to a shift and generate a report > no change to the report (value is still null).
-After assignment, save custom ID and generate report > the report should show the custom ID. 

Acceptance Criteria:
-Verify that the custom ID is saved correctly in the database.
-Verify that the UI shows the field correctly in the agent screen and unique per Agent & Facility.
-Verify the validation specs for the newly created field, 5 chars in length (Assumption).
-Verify if the new custom ID appears correctly in the report as per the required specs. 

-Estimation: 4Hrs