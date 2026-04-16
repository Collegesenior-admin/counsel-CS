-- Example: How to update the rankings table structured_data for dynamic year management
-- This allows you to edit text templates and years from the database without touching code

-- Update existing ranking record with text content in structured_data
UPDATE rankings 
SET structured_data = '{
  "current_year": 2026,
  "prev_year": 2025,
  "intro_template": "The institution has been featured in the <strong>{agency} {current_year}</strong> rankings. According to the {agency} Ranking {current_year}, the college is ranked <strong>{rank}</strong> in the {stream} category. The rankings reflect the institutions consistent efforts toward academic growth and student development.",
  "comparison_template": "The table below shows {agency} ranking trends across major categories. The institution has shown {status} in the {stream} category compared to last year."
}'::jsonb
WHERE college_id = 1; -- Replace with your college ID

-- Available placeholders in templates:
-- {agency} - Ranking agency name (e.g., NIRF, QS World University)
-- {current_year} - Current year from structured_data.current_year
-- {prev_year} - Previous year from structured_data.prev_year  
-- {rank} - College rank for that agency
-- {stream} - Stream/category name (e.g., Engineering, Overall)
-- {status} - Auto-calculated status (improvement/slight dip/consistent performance)

-- To change years globally, just update these two fields:
UPDATE rankings 
SET structured_data = jsonb_set(
  jsonb_set(
    structured_data,
    '{current_year}',
    '2027'
  ),
  '{prev_year}',
  '2026'
)
WHERE college_id = 1;

-- To customize text for a specific college:
UPDATE rankings 
SET structured_data = jsonb_set(
  structured_data,
  '{intro_template}',
  '"Custom intro text for this college with {agency} {current_year} and rank {rank}"'
)
WHERE college_id = 1;
