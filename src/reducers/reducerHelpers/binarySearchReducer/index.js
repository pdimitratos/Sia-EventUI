//This is intended to be a Redux-friendly special case implementation
//of a tree similar to a left-leaning red-black tree
//optimized for insertion/retrieval of multiple records (pages)
//especially when records may be inserted into server-side pages at random
//see:
//https://en.wikipedia.org/wiki/Red%E2%80%93black_tree
//https://en.wikipedia.org/wiki/Left-leaning_red%E2%80%93black_tree
//http://www.mew.org/~kazu/proj/red-black-tree/