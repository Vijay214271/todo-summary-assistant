import supabase from '../db.js';
import summarizeTodo from '../services/llmService.js';
import sendToSlack from '../services/SlackServices.js';

export const getTodos = async (req, res) => {
	const {data, error} = await supabase.from('todos').select('*').order('id', {ascending : true});

    if(error) return res.status(500).json({error:error.message});
    res.json(data);
};

export const createTodo = async (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: 'Todo text is required' });

  const { data, error } = await supabase.from('todos').insert([{ text,done: false }]).select();

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json(data[0]);
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { text, done } = req.body;

  console.log('========================');
  console.log(`🔧 PATCH request received`);
  console.log(`🔧 Params - id: ${id}`);
  console.log(`🔧 Body   - text: ${text}, done: ${done}`);

  const numericId = parseInt(id);
  if (isNaN(numericId)) {
    console.log('❌ Invalid ID format. Must be a number.');
    return res.status(400).json({ error: 'Invalid ID format. Must be a number.' });
  }
  console.log(`✅ Parsed numeric ID: ${numericId}`);

  // Show all current todos
  const { data: allTodos, error: allError } = await supabase.from('todos').select('*');
  if (allError) {
    console.error('❌ Error fetching todos:', allError);
  } else {
    console.log('📋 All Todos from Supabase:', allTodos);
  }

  if (!text && done === undefined) {
    console.log('❌ No valid fields to update provided');
    return res.status(400).json({ error: 'Provide at least text or done status to update' });
  }

  const updateData = {};
  if (text !== undefined) updateData.text = text;
  if (done !== undefined) updateData.done = done;

  console.log('🛠 Update payload constructed:', updateData);

  // Check if the todo exists
  const { data: existingTodo, error: checkError } = await supabase
    .from('todos')
    .select('*')
    .eq('id', numericId);

  if (checkError) {
    console.error('❌ Error checking for existing todo:', checkError);
    return res.status(500).json({ error: 'Error checking for todo' });
  }

  if (!existingTodo || existingTodo.length === 0) {
    console.log(`⚠️ No todo found with id: ${numericId}. Skipping update.`);
    return res.status(404).json({ error: 'Todo not found' });
  }

  console.log(`🔍 Matching todo before update (id=${numericId}):`, existingTodo);

  // Now update the todo
  const { data, error } = await supabase
    .from('todos')
    .update(updateData)
    .eq('id', numericId)
    .select();

  console.log("📦 Supabase update result:", data);

  if (error) {
    console.error('❌ Supabase update error:', error);
    return res.status(500).json({ error: error.message });
  }

  console.log(`✅ Successfully updated todo with id: ${numericId}`);
  console.log('🆕 Updated Todo:', data[0]);
  console.log('========================\n');

  res.json(data[0]);
};





export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from('todos').delete().eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Todo deleted' });
};

export const summarizeTodos = async (req, res) => {
  const { data, error } = await supabase.from('todos').select('*');

  if (error) return res.status(500).json({ error: error.message });
  if (!data.length) return res.status(400).json({ error: 'No todos to summarize' });

  try {
    const summary = await summarizeTodo(data);
    await sendToSlack(summary);
    res.json({ message: 'Summary sent to Slack successfully', summary });
  } catch (err) {
    res.status(500).json({ error: 'Failed to summarize or send to Slack', details: err.message });
  }
};