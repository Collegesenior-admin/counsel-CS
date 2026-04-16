-- Example: How to populate cutoffs table with new cutoff_data JSON format

-- Insert cutoff record for a college with category-wise ranks
INSERT INTO cutoffs (college_id, course_id, cutoff_data, structured_data)
VALUES
  (1, NULL, '[
    {
      "exam": "TNEA / JEE Main",
      "year": "2026",
      "title": "Indian Institute of Technology Madras B.Tech Computer Science Cutoff 2026",
      "stream": "Computer Science Engineering",
      "content": "The B.Tech CSE cutoff for 2026 is influenced by the high demand for Artificial Intelligence and Data Science specializations. Candidates must participate in TNEA counselling.",
      "category": [
        {
          "name": "General",
          "rank": "5420"
        },
        {
          "name": "OBC",
          "rank": "8210"
        },
        {
          "name": "SC/ST",
          "rank": "15400"
        }
      ],
      "eligibility": "50% in PCM"
    },
    {
      "exam": "TNEA",
      "year": "2026",
      "title": "Indian Institute of Technology Madras B.Tech Mechanical Engineering Cutoff 2026",
      "stream": "Mechanical Engineering",
      "content": "Mechanical Engineering cutoffs have remained stable over the last two years. The institution focuses on core technical proficiency and industry-ready workshops.",
      "category": [
        {
          "name": "General",
          "rank": "12400"
        },
        {
          "name": "OBC",
          "rank": "18500"
        },
        {
          "name": "SC/ST",
          "rank": "22000"
        }
      ],
      "eligibility": "50% in PCM"
    }
  ]'::jsonb, NULL);

-- Query to view cutoff data with category details
SELECT 
  id,
  college_id,
  jsonb_array_elements(cutoff_data) as cutoff_item
FROM cutoffs
WHERE college_id = 1;

-- Query to extract specific fields including categories
SELECT 
  id,
  college_id,
  item->>'title' as title,
  item->>'exam' as exam,
  item->>'stream' as stream,
  item->>'year' as year,
  item->>'eligibility' as eligibility,
  item->'category' as categories
FROM cutoffs,
jsonb_array_elements(cutoff_data) as item
WHERE college_id = 1;
