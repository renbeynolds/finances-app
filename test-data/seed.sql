INSERT INTO public.accounts (name, date_header, description_header, amounts_type, amount_header) VALUES
('Checking', 'Date', 'Description', 'negamtexp', 'Amount'),
('Savings', 'Date', 'Description', 'negamtexp', 'Amount'),
('Credit Card', 'Date', 'Description', 'negamtexp', 'Amount');

INSERT INTO public.categories (name, type) VALUES
('Housing', 'expense'),
('Utilities', 'expense'),
('Groceries', 'expense'),
('Transportation', 'expense'),
('Healthcare', 'expense'),
('Entertainment', 'expense'),
('Income', 'income'),
('Transfer', 'transfer');