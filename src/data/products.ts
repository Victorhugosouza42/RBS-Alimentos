import { Product, Category } from '../types';

export const categories: Category[] = [
  { id: 'queijos', name: 'Queijos', emoji: '🧀', color: 'from-amber-500 to-amber-600', subcategories: ['Mussarela Artesanal','Mussarela Industrializada','Mussarela Fatiada','Creme Cheese','Queijo de Coalho','Queijo Provolone','Queijo Parmesão Fracionado','Queijo Parmesão Ralado','Queijo Gorgonzola'] },
  { id: 'frios', name: 'Frios & Embutidos', emoji: '🥩', color: 'from-red-500 to-rose-600', subcategories: ['Pontas / Pedaços','Filé de Peito Pacote','Filé de Peito Bandeja','Filezinho de Peito','Filé de Peito Desfiado','Calabresa Fina','Calabresa Grossa','Calabresa Fatiada','Bacon Cubinhos','Bacon Fatiado','Bacon Medalhão','Bacon Manta','Bacon Pernil','Apresuntado Fatiado','Apresuntado Peça','Presunto Peça','Lanche Peça','Lombo Canadense','Pepperoni Fatiado','Salsicha','Mortadela Defumada'] },
  { id: 'hamburguer', name: 'Hambúrguer', emoji: '🍔', color: 'from-orange-500 to-amber-600', subcategories: ['Hambúrguer Tradicional','Hambúrguer Picanha'] },
  { id: 'laticinios', name: 'Laticínios & Pastas', emoji: '🧈', color: 'from-sky-500 to-blue-600', subcategories: ['Requeijão Bisnaga Puro','Requeijão Bisnaga C/ Amido','Cobertura Culinária Requeijão','Cheddar Bisnaga Puro','Cheddar Bisnaga C/ Amido','Cobertura Culinária Cheddar','Doce de Leite Bisnaga','Chocolate Bisnaga','Cheddar Fatiado','Leite de Caixinha','Manteiga 500g','Manteiga 200g'] },
  { id: 'conservas', name: 'Conservas & Ingredientes', emoji: '🥫', color: 'from-emerald-500 to-teal-600', subcategories: ['Molho p/ Pizza','Milho Latão 1,7kg','Milho Latinha 170g','Milho Sachê 170g','Ervilha Lata','Palmito Picado','Palmito Inteiro','Palmito Rodelas','Azeitona Roxa c/ Caroço','Azeitona Verde c/ Caroço Média','Azeitona Verde c/ Caroço Miúda','Azeitona Verde Sem Caroço','Azeitona Verde Fatiada','Champignon Fatiado','Champignon Inteiro','Tomate Seco','Pimenta Biquinho','Batata Palha 1kg','Fermento 500g'] },
  { id: 'molhos', name: 'Molhos & Condimentos', emoji: '🫙', color: 'from-violet-500 to-purple-600', subcategories: ['Heinz','D\'Ajuda','Predilecta','Bonapetite','Mareia','Lanchero'] },
  { id: 'embalagens', name: 'Embalagens & Descartáveis', emoji: '📦', color: 'from-slate-400 to-slate-500', subcategories: ['Papel Acoplado','Saco Delivery','Hamburgueira','Saco p/ Hambúrguer','Saco p/ Geladinho','Lacre p/ Embalagem','Garrafa p/ Suco','Papel Toalha','Caixa de Pizza'] },
];

export const initialProducts: Product[] = [
  // MUSSARELA ARTESANAL
  { id: 'p1', name: 'Mussarela Artesanal', category: 'queijos', subcategory: 'Mussarela Artesanal', brand: 'Tradição', price: 30, description: '3kg', emoji: '🧀', active: true },
  { id: 'p2', name: 'Mussarela Artesanal', category: 'queijos', subcategory: 'Mussarela Artesanal', brand: 'Vereda', price: 30, description: '4kg', emoji: '🧀', active: true },
  { id: 'p3', name: 'Mussarela Artesanal', category: 'queijos', subcategory: 'Mussarela Artesanal', brand: 'Vereda', price: 30, description: '1kg', emoji: '🧀', active: true },
  { id: 'p4', name: 'Mussarela Artesanal', category: 'queijos', subcategory: 'Mussarela Artesanal', brand: 'Mutum', price: 28, description: '3kg', emoji: '🧀', active: true },
  // MUSSARELA INDUSTRIALIZADA
  { id: 'p5', name: 'Mussarela Industrializada', category: 'queijos', subcategory: 'Mussarela Industrializada', brand: 'Davaca', price: 40, description: '', emoji: '🧀', active: true },
  { id: 'p6', name: 'Mussarela Industrializada', category: 'queijos', subcategory: 'Mussarela Industrializada', brand: 'Yoguedes', price: 38, description: '', emoji: '🧀', active: true },
  { id: 'p7', name: 'Mussarela Industrializada', category: 'queijos', subcategory: 'Mussarela Industrializada', brand: 'Jordânia', price: 36, description: '', emoji: '🧀', active: true },
  // MUSSARELA FATIADA
  { id: 'p8', name: 'Mussarela Fatiada', category: 'queijos', subcategory: 'Mussarela Fatiada', brand: 'Davaca', price: 41, description: '', emoji: '🧀', active: true },
  { id: 'p9', name: 'Mussarela Fatiada', category: 'queijos', subcategory: 'Mussarela Fatiada', brand: 'Yoguedes', price: 39, description: '', emoji: '🧀', active: true },
  { id: 'p10', name: 'Mussarela Fatiada', category: 'queijos', subcategory: 'Mussarela Fatiada', brand: 'Jordânia', price: 37, description: '', emoji: '🧀', active: true },
  // PONTAS / PEDAÇOS
  { id: 'p11', name: 'Mussarela Pontas', category: 'frios', subcategory: 'Pontas / Pedaços', brand: 'Davaca', price: 35, description: 'Abaixo do custo', emoji: '🧀', active: true },
  { id: 'p12', name: 'Apresuntado Pontas', category: 'frios', subcategory: 'Pontas / Pedaços', brand: 'Frisa', price: 15, description: 'Abaixo do custo', emoji: '🥩', active: true },
  // FILÉ DE PEITO PACOTE
  { id: 'p13', name: 'Filé de Peito Pacote', category: 'frios', subcategory: 'Filé de Peito Pacote', brand: 'Avenova', price: 18, description: '', emoji: '🍗', active: true },
  { id: 'p14', name: 'Filé de Peito Pacote', category: 'frios', subcategory: 'Filé de Peito Pacote', brand: 'Avivar', price: 18, description: '', emoji: '🍗', active: true },
  // FILÉ DE PEITO BANDEJA
  { id: 'p15', name: 'Filé de Peito Bandeja', category: 'frios', subcategory: 'Filé de Peito Bandeja', brand: 'Avivar', price: 22, description: '', emoji: '🍗', active: true },
  { id: 'p16', name: 'Filé de Peito Bandeja', category: 'frios', subcategory: 'Filé de Peito Bandeja', brand: 'Seara', price: 22, description: '', emoji: '🍗', active: true },
  { id: 'p17', name: 'Filé de Peito Bandeja', category: 'frios', subcategory: 'Filé de Peito Bandeja', brand: 'Sadia', price: 22, description: '', emoji: '🍗', active: true },
  // FILEZINHO DE PEITO
  { id: 'p18', name: 'Filezinho de Peito', category: 'frios', subcategory: 'Filezinho de Peito', brand: 'Seara', price: 22, description: 'Bandeja', emoji: '🍗', active: true },
  // FILÉ DE PEITO DESFIADO
  { id: 'p19', name: 'Filé de Peito Desfiado', category: 'frios', subcategory: 'Filé de Peito Desfiado', brand: 'Avivar', price: 32, description: '', emoji: '🍗', active: true },
  // CALABRESA FINA
  { id: 'p20', name: 'Calabresa Fina', category: 'frios', subcategory: 'Calabresa Fina', brand: 'Frisa', price: 18, description: '', emoji: '🌶️', active: true },
  // CALABRESA GROSSA
  { id: 'p21', name: 'Calabresa Grossa', category: 'frios', subcategory: 'Calabresa Grossa', brand: 'Friella', price: 22, description: 'Curva', emoji: '🌶️', active: true },
  { id: 'p22', name: 'Calabresa Grossa', category: 'frios', subcategory: 'Calabresa Grossa', brand: 'Friella', price: 22, description: 'Reta', emoji: '🌶️', active: true },
  { id: 'p23', name: 'Calabresa Grossa', category: 'frios', subcategory: 'Calabresa Grossa', brand: 'Sadia', price: 22, description: 'Reta', emoji: '🌶️', active: true },
  { id: 'p24', name: 'Calabresa Grossa', category: 'frios', subcategory: 'Calabresa Grossa', brand: 'Ferbigger', price: 16, description: 'Curva', emoji: '🌶️', active: true },
  // CALABRESA FATIADA
  { id: 'p25', name: 'Calabresa Fatiada', category: 'frios', subcategory: 'Calabresa Fatiada', brand: 'Frigoleste', price: 26, description: 'Embalada a vácuo', emoji: '🌶️', active: true },
  { id: 'p26', name: 'Calabresa Fatiada', category: 'frios', subcategory: 'Calabresa Fatiada', brand: 'Sul Montti', price: 22, description: 'Embalada a vácuo', emoji: '🌶️', active: true },
  { id: 'p27', name: 'Calabresa Fatiada', category: 'frios', subcategory: 'Calabresa Fatiada', brand: 'Ferbigger', price: 21, description: 'Embalada a vácuo', emoji: '🌶️', active: true },
  // BACON CUBINHOS
  { id: 'p28', name: 'Bacon Cubinhos', category: 'frios', subcategory: 'Bacon Cubinhos', brand: 'Frigoleste', price: 32, description: '', emoji: '🥓', active: true },
  { id: 'p29', name: 'Bacon Cubinhos', category: 'frios', subcategory: 'Bacon Cubinhos', brand: 'Friella', price: 28, description: '', emoji: '🥓', active: true },
  { id: 'p30', name: 'Bacon Cubinhos', category: 'frios', subcategory: 'Bacon Cubinhos', brand: 'Trem de Minas', price: 26, description: '', emoji: '🥓', active: true },
  { id: 'p31', name: 'Bacon Cubinhos', category: 'frios', subcategory: 'Bacon Cubinhos', brand: 'Sul Montti', price: 24, description: '', emoji: '🥓', active: true },
  // BACON FATIADO
  { id: 'p32', name: 'Bacon Fatiado', category: 'frios', subcategory: 'Bacon Fatiado', brand: 'Sul Montti', price: 31, description: '', emoji: '🥓', active: true },
  { id: 'p33', name: 'Bacon Fatiado', category: 'frios', subcategory: 'Bacon Fatiado', brand: 'RZ Delizia', price: 28, description: '', emoji: '🥓', active: true },
  // BACON MEDALHÃO
  { id: 'p34', name: 'Bacon Medalhão', category: 'frios', subcategory: 'Bacon Medalhão', brand: 'Cotipa', price: 32, description: '', emoji: '🥓', active: true },
  // BACON MANTA
  { id: 'p35', name: 'Bacon Manta', category: 'frios', subcategory: 'Bacon Manta', brand: 'Frigoleste', price: 32, description: '', emoji: '🥩', active: true },
  { id: 'p36', name: 'Bacon Manta', category: 'frios', subcategory: 'Bacon Manta', brand: 'Frisa', price: 30, description: '', emoji: '🥩', active: true },
  // BACON PERNIL
  { id: 'p37', name: 'Bacon Pernil', category: 'frios', subcategory: 'Bacon Pernil', brand: 'Frisa', price: 28, description: '', emoji: '🥩', active: true },
  // HAMBÚRGUER TRADICIONAL
  { id: 'p38', name: 'Hambúrguer Tradicional', category: 'hamburguer', subcategory: 'Hambúrguer Tradicional', brand: 'Frisa', price: 52, description: '48x56g', emoji: '🍔', active: true },
  { id: 'p39', name: 'Hambúrguer Tradicional', category: 'hamburguer', subcategory: 'Hambúrguer Tradicional', brand: 'Felicittá', price: 50, description: '48x56g', emoji: '🍔', active: true },
  // HAMBÚRGUER PICANHA
  { id: 'p40', name: 'Hambúrguer Picanha', category: 'hamburguer', subcategory: 'Hambúrguer Picanha', brand: 'Frisa', price: 60, description: '24x90g', emoji: '🍔', active: true },
  // APRESUNTADO FATIADO
  { id: 'p41', name: 'Apresuntado Fatiado', category: 'frios', subcategory: 'Apresuntado Fatiado', brand: 'Frisa', price: 20, description: '', emoji: '🥩', active: true },
  // APRESUNTADO PEÇA
  { id: 'p42', name: 'Apresuntado Peça', category: 'frios', subcategory: 'Apresuntado Peça', brand: 'Pif Paf', price: 18, description: '', emoji: '🥩', active: true },
  { id: 'p43', name: 'Apresuntado Peça', category: 'frios', subcategory: 'Apresuntado Peça', brand: 'Frisa', price: 18, description: '', emoji: '🥩', active: true },
  // PRESUNTO PEÇA
  { id: 'p44', name: 'Presunto Peça', category: 'frios', subcategory: 'Presunto Peça', brand: 'Perdigão', price: 22, description: '', emoji: '🥩', active: true },
  { id: 'p45', name: 'Presunto Peça', category: 'frios', subcategory: 'Presunto Peça', brand: 'Pif Paf', price: 22, description: '', emoji: '🥩', active: true },
  // LANCHE PEÇA
  { id: 'p46', name: 'Lanche Peça', category: 'frios', subcategory: 'Lanche Peça', brand: 'Pif Paf', price: 0, description: 'Consulte', emoji: '🥩', active: true },
  { id: 'p47', name: 'Lanche Peça', category: 'frios', subcategory: 'Lanche Peça', brand: 'Frisa', price: 0, description: 'Consulte', emoji: '🥩', active: true },
  // CREME CHEESE
  { id: 'p48', name: 'Creme Cheese', category: 'queijos', subcategory: 'Creme Cheese', brand: 'Scala', price: 48, description: '1,2kg', emoji: '🧀', active: true },
  { id: 'p49', name: 'Creme Cheese', category: 'queijos', subcategory: 'Creme Cheese', brand: 'Santa Maria', price: 40, description: '1,01kg', emoji: '🧀', active: true },
  // REQUEIJÃO BISNAGA PURO
  { id: 'p50', name: 'Requeijão Bisnaga Puro', category: 'laticinios', subcategory: 'Requeijão Bisnaga Puro', brand: 'Catupiry', price: 70, description: '1,5kg', emoji: '🧈', active: true },
  { id: 'p51', name: 'Requeijão Bisnaga Puro', category: 'laticinios', subcategory: 'Requeijão Bisnaga Puro', brand: 'Scala', price: 55, description: '1,5kg', emoji: '🧈', active: true },
  { id: 'p52', name: 'Requeijão Bisnaga Puro', category: 'laticinios', subcategory: 'Requeijão Bisnaga Puro', brand: 'Scalon', price: 53, description: '1,5kg', emoji: '🧈', active: true },
  { id: 'p53', name: 'Requeijão Bisnaga Puro', category: 'laticinios', subcategory: 'Requeijão Bisnaga Puro', brand: 'Santa Maria', price: 52, description: '1,5kg', emoji: '🧈', active: true },
  { id: 'p54', name: 'Requeijão Bisnaga Puro', category: 'laticinios', subcategory: 'Requeijão Bisnaga Puro', brand: 'Dona Formosa', price: 45, description: '1,5kg', emoji: '🧈', active: true },
  // REQUEIJÃO BISNAGA C/ AMIDO
  { id: 'p55', name: 'Requeijão Bisnaga C/ Amido', category: 'laticinios', subcategory: 'Requeijão Bisnaga C/ Amido', brand: 'Santa Maria', price: 38, description: '1,8kg', emoji: '🧈', active: true },
  { id: 'p56', name: 'Requeijão Bisnaga C/ Amido', category: 'laticinios', subcategory: 'Requeijão Bisnaga C/ Amido', brand: 'Dona Formosa', price: 30, description: '1,5kg', emoji: '🧈', active: true },
  // COBERTURA CULINÁRIA REQUEIJÃO
  { id: 'p57', name: 'Cobertura Culinária Requeijão', category: 'laticinios', subcategory: 'Cobertura Culinária Requeijão', brand: 'Reke Pizza', price: 15, description: '1,8kg', emoji: '🧈', active: true },
  { id: 'p58', name: 'Cobertura Culinária Requeijão', category: 'laticinios', subcategory: 'Cobertura Culinária Requeijão', brand: 'Gostei', price: 12, description: '1,5kg', emoji: '🧈', active: true },
  // CHEDDAR BISNAGA PURO
  { id: 'p59', name: 'Cheddar Bisnaga Puro', category: 'laticinios', subcategory: 'Cheddar Bisnaga Puro', brand: 'Scala', price: 64, description: '1,5kg', emoji: '🧀', active: true },
  { id: 'p60', name: 'Cheddar Bisnaga Puro', category: 'laticinios', subcategory: 'Cheddar Bisnaga Puro', brand: 'Santa Maria', price: 52, description: '1,5kg', emoji: '🧀', active: true },
  { id: 'p61', name: 'Cheddar Bisnaga Puro', category: 'laticinios', subcategory: 'Cheddar Bisnaga Puro', brand: 'Dona Formosa', price: 40, description: '1,2kg', emoji: '🧀', active: true },
  { id: 'p62', name: 'Cheddar Bisnaga Puro', category: 'laticinios', subcategory: 'Cheddar Bisnaga Puro', brand: 'Scalon', price: 40, description: '1,02kg', emoji: '🧀', active: true },
  // CHEDDAR BISNAGA C/ AMIDO
  { id: 'p63', name: 'Cheddar Bisnaga C/ Amido', category: 'laticinios', subcategory: 'Cheddar Bisnaga C/ Amido', brand: 'Santa Maria', price: 38, description: '1,8kg', emoji: '🧀', active: true },
  // COBERTURA CULINÁRIA CHEDDAR
  { id: 'p64', name: 'Cobertura Culinária Cheddar', category: 'laticinios', subcategory: 'Cobertura Culinária Cheddar', brand: 'Reke Pizza', price: 16, description: '1,2kg', emoji: '🧀', active: true },
  // DOCE DE LEITE BISNAGA
  { id: 'p65', name: 'Doce de Leite Bisnaga', category: 'laticinios', subcategory: 'Doce de Leite Bisnaga', brand: 'Santa Maria', price: 40, description: '1,2kg', emoji: '🍮', active: true },
  // CHOCOLATE BISNAGA
  { id: 'p66', name: 'Chocolate Bisnaga', category: 'laticinios', subcategory: 'Chocolate Bisnaga', brand: 'Santa Maria', price: 40, description: '1,2kg', emoji: '🍫', active: true },
  // CHEDDAR FATIADO
  { id: 'p67', name: 'Cheddar Fatiado', category: 'laticinios', subcategory: 'Cheddar Fatiado', brand: 'Opera', price: 0, description: '2,27kg - Consulte', emoji: '🧀', active: true },
  // LEITE DE CAIXINHA
  { id: 'p68', name: 'Leite de Caixinha', category: 'laticinios', subcategory: 'Leite de Caixinha', brand: 'Italac', price: 5, description: 'Com tampa de 1L', emoji: '🥛', active: true },
  // LOMBO CANADENSE
  { id: 'p69', name: 'Lombo Canadense', category: 'frios', subcategory: 'Lombo Canadense', brand: 'Frisa', price: 35, description: '', emoji: '🥩', active: true },
  // PEPPERONI FATIADO
  { id: 'p70', name: 'Pepperoni Fatiado', category: 'frios', subcategory: 'Pepperoni Fatiado', brand: 'Ceratti', price: 80, description: '1kg', emoji: '🍕', active: true },
  { id: 'p71', name: 'Pepperoni Fatiado', category: 'frios', subcategory: 'Pepperoni Fatiado', brand: 'Sadia', price: 10, description: '100g', emoji: '🍕', active: true },
  // SALSICHA
  { id: 'p72', name: 'Salsicha', category: 'frios', subcategory: 'Salsicha', brand: 'Pif Paf', price: 11, description: '', emoji: '🌭', active: true },
  { id: 'p73', name: 'Salsicha', category: 'frios', subcategory: 'Salsicha', brand: 'Sadia', price: 11, description: '', emoji: '🌭', active: true },
  // MORTADELA DEFUMADA
  { id: 'p74', name: 'Mortadela Defumada', category: 'frios', subcategory: 'Mortadela Defumada', brand: 'Perdigão Ouro', price: 23, description: 'Bologna Premium', emoji: '🥩', active: true },
  { id: 'p75', name: 'Mortadela Defumada', category: 'frios', subcategory: 'Mortadela Defumada', brand: 'Seara Gourmet', price: 20, description: 'Bologna Premium', emoji: '🥩', active: true },
  // QUEIJO DE COALHO
  { id: 'p76', name: 'Queijo de Coalho', category: 'queijos', subcategory: 'Queijo de Coalho', brand: 'Dona Formosa', price: 55, description: 'Palito', emoji: '🧀', active: true },
  { id: 'p77', name: 'Queijo de Coalho', category: 'queijos', subcategory: 'Queijo de Coalho', brand: 'Jordânia', price: 50, description: 'Barra', emoji: '🧀', active: true },
  // QUEIJO PROVOLONE
  { id: 'p78', name: 'Queijo Provolone', category: 'queijos', subcategory: 'Queijo Provolone', brand: 'Larissa', price: 60, description: '', emoji: '🧀', active: true },
  { id: 'p79', name: 'Queijo Provolone', category: 'queijos', subcategory: 'Queijo Provolone', brand: 'Cristal', price: 50, description: '', emoji: '🧀', active: true },
  // QUEIJO PARMESÃO FRACIONADO
  { id: 'p80', name: 'Queijo Parmesão Fracionado', category: 'queijos', subcategory: 'Queijo Parmesão Fracionado', brand: 'Dona Formosa', price: 85, description: '', emoji: '🧀', active: true },
  // QUEIJO PARMESÃO RALADO
  { id: 'p81', name: 'Queijo Parmesão Ralado Médio', category: 'queijos', subcategory: 'Queijo Parmesão Ralado', brand: 'RJ Alimentos', price: 45, description: '', emoji: '🧀', active: true },
  // QUEIJO GORGONZOLA
  { id: 'p82', name: 'Queijo Gorgonzola', category: 'queijos', subcategory: 'Queijo Gorgonzola', brand: 'Dona Formosa', price: 75, description: '1kg', emoji: '🧀', active: true },
  { id: 'p83', name: 'Queijo Gorgonzola', category: 'queijos', subcategory: 'Queijo Gorgonzola', brand: 'São Vicente', price: 75, description: '1kg', emoji: '🧀', active: true },
  // MANTEIGA 500g
  { id: 'p84', name: 'Manteiga', category: 'laticinios', subcategory: 'Manteiga 500g', brand: 'Davaca', price: 21, description: '500g', emoji: '🧈', active: true },
  // MANTEIGA 200g
  { id: 'p85', name: 'Manteiga', category: 'laticinios', subcategory: 'Manteiga 200g', brand: 'CristauLat', price: 9, description: '200g', emoji: '🧈', active: true },
  { id: 'p86', name: 'Manteiga', category: 'laticinios', subcategory: 'Manteiga 200g', brand: 'Davaca', price: 9, description: '200g', emoji: '🧈', active: true },
  // MOLHO P/ PIZZA
  { id: 'p87', name: 'Molho p/ Pizza', category: 'conservas', subcategory: 'Molho p/ Pizza', brand: 'Predilecta', price: 15, description: '1,7kg', emoji: '🍅', active: true },
  { id: 'p88', name: 'Molho p/ Pizza', category: 'conservas', subcategory: 'Molho p/ Pizza', brand: 'Bonare', price: 0, description: '1,7kg - Consulte', emoji: '🍅', active: true },
  { id: 'p89', name: 'Molho p/ Pizza', category: 'conservas', subcategory: 'Molho p/ Pizza', brand: 'Fugini', price: 0, description: '1,7kg - Consulte', emoji: '🍅', active: true },
  { id: 'p90', name: 'Molho p/ Pizza', category: 'conservas', subcategory: 'Molho p/ Pizza', brand: 'Olé', price: 12, description: '1,7kg', emoji: '🍅', active: true },
  // MILHO LATÃO 1,7kg
  { id: 'p91', name: 'Milho Latão', category: 'conservas', subcategory: 'Milho Latão 1,7kg', brand: 'Predilecta', price: 25, description: '1,7kg', emoji: '🌽', active: true },
  { id: 'p92', name: 'Milho Latão', category: 'conservas', subcategory: 'Milho Latão 1,7kg', brand: 'Olé', price: 25, description: '1,7kg', emoji: '🌽', active: true },
  // MILHO LATINHA 170g
  { id: 'p93', name: 'Milho Latinha', category: 'conservas', subcategory: 'Milho Latinha 170g', brand: 'Predilecta', price: 3, description: '170g', emoji: '🌽', active: true },
  { id: 'p94', name: 'Milho Latinha', category: 'conservas', subcategory: 'Milho Latinha 170g', brand: 'Olé', price: 3, description: '170g', emoji: '🌽', active: true },
  // MILHO SACHÊ 170g
  { id: 'p95', name: 'Milho Sachê', category: 'conservas', subcategory: 'Milho Sachê 170g', brand: 'Bonare', price: 3, description: '170g', emoji: '🌽', active: true },
  // ERVILHA LATA
  { id: 'p96', name: 'Ervilha Lata', category: 'conservas', subcategory: 'Ervilha Lata', brand: 'Olé', price: 22, description: '1,7kg', emoji: '🫛', active: true },
  { id: 'p97', name: 'Ervilha Lata', category: 'conservas', subcategory: 'Ervilha Lata', brand: 'Olé', price: 3, description: '170g', emoji: '🫛', active: true },
  // PALMITO PICADO
  { id: 'p98', name: 'Palmito Picado', category: 'conservas', subcategory: 'Palmito Picado', brand: 'Pupunha', price: 50, description: '1,8kg', emoji: '🥫', active: true },
  { id: 'p99', name: 'Palmito Picado', category: 'conservas', subcategory: 'Palmito Picado', brand: 'Pupunha', price: 10, description: '300g', emoji: '🥫', active: true },
  // PALMITO INTEIRO
  { id: 'p100', name: 'Palmito Inteiro', category: 'conservas', subcategory: 'Palmito Inteiro', brand: 'Pupunha', price: 70, description: '1,8kg', emoji: '🥫', active: true },
  { id: 'p101', name: 'Palmito Inteiro', category: 'conservas', subcategory: 'Palmito Inteiro', brand: 'Pupunha', price: 17, description: '300g', emoji: '🥫', active: true },
  // PALMITO RODELAS
  { id: 'p102', name: 'Palmito Rodelas', category: 'conservas', subcategory: 'Palmito Rodelas', brand: 'Pupunha', price: 50, description: '1,8kg', emoji: '🥫', active: true },
  { id: 'p103', name: 'Palmito Rodelas', category: 'conservas', subcategory: 'Palmito Rodelas', brand: 'Pupunha', price: 15, description: '300g', emoji: '🥫', active: true },
  // AZEITONA ROXA COM CAROÇO
  { id: 'p104', name: 'Azeitona Roxa c/ Caroço', category: 'conservas', subcategory: 'Azeitona Roxa c/ Caroço', brand: 'Don Giovani', price: 0, description: 'Média - Consulte', emoji: '🟣', active: true },
  // AZEITONA VERDE COM CAROÇO MÉDIA
  { id: 'p105', name: 'Azeitona Verde c/ Caroço', category: 'conservas', subcategory: 'Azeitona Verde c/ Caroço Média', brand: 'Don Giovani', price: 0, description: 'Média 1,8kg - Consulte', emoji: '🫒', active: true },
  // AZEITONA VERDE COM CAROÇO MIÚDA
  { id: 'p106', name: 'Azeitona Verde c/ Caroço', category: 'conservas', subcategory: 'Azeitona Verde c/ Caroço Miúda', brand: 'Don Giovani', price: 0, description: 'Miúda 1,8kg - Consulte', emoji: '🫒', active: true },
  // AZEITONA VERDE SEM CAROÇO
  { id: 'p107', name: 'Azeitona Verde Sem Caroço', category: 'conservas', subcategory: 'Azeitona Verde Sem Caroço', brand: 'Don Giovani', price: 0, description: '1,8kg - Consulte', emoji: '🫒', active: true },
  // AZEITONA VERDE FATIADA
  { id: 'p108', name: 'Azeitona Verde Fatiada', category: 'conservas', subcategory: 'Azeitona Verde Fatiada', brand: 'Tio Paco', price: 65, description: '2kg', emoji: '🫒', active: true },
  // CHAMPIGNON FATIADO
  { id: 'p109', name: 'Champignon Fatiado', category: 'conservas', subcategory: 'Champignon Fatiado', brand: 'Don Giovani', price: 0, description: '2kg - Consulte', emoji: '🍄', active: true },
  // CHAMPIGNON INTEIRO
  { id: 'p110', name: 'Champignon Inteiro', category: 'conservas', subcategory: 'Champignon Inteiro', brand: 'Don Giovani', price: 0, description: '2kg - Consulte', emoji: '🍄', active: true },
  // TOMATE SECO
  { id: 'p111', name: 'Tomate Seco', category: 'conservas', subcategory: 'Tomate Seco', brand: 'Don Giovani', price: 40, description: '1,4kg', emoji: '🍅', active: true },
  // PIMENTA BIQUINHO
  { id: 'p112', name: 'Pimenta Biquinho', category: 'conservas', subcategory: 'Pimenta Biquinho', brand: 'Don Giovani', price: 55, description: '2kg', emoji: '🌶️', active: true },
  // BATATA PALHA 1kg
  { id: 'p113', name: 'Batata Palha', category: 'conservas', subcategory: 'Batata Palha 1kg', brand: 'Mr. Cook', price: 25, description: 'Tradicional 1kg', emoji: '🍟', active: true },
  { id: 'p114', name: 'Batata Palha', category: 'conservas', subcategory: 'Batata Palha 1kg', brand: 'Mr. Cook', price: 25, description: 'Extra Fina 1kg', emoji: '🍟', active: true },
  { id: 'p115', name: 'Batata Palha', category: 'conservas', subcategory: 'Batata Palha 1kg', brand: 'Boa', price: 20, description: 'Tradicional 1kg', emoji: '🍟', active: true },
  { id: 'p116', name: 'Batata Palha', category: 'conservas', subcategory: 'Batata Palha 1kg', brand: 'Boa', price: 20, description: 'Extra Fina 1kg', emoji: '🍟', active: true },
  // HEINZ
  { id: 'p117', name: 'Maionese', category: 'molhos', subcategory: 'Heinz', brand: 'Heinz', price: 28, description: '144x7g', emoji: '🥫', active: true },
  { id: 'p118', name: 'Mostarda', category: 'molhos', subcategory: 'Heinz', brand: 'Heinz', price: 28, description: '144x7g', emoji: '🟡', active: true },
  { id: 'p119', name: 'Ketchup', category: 'molhos', subcategory: 'Heinz', brand: 'Heinz', price: 28, description: '144x7g', emoji: '🍅', active: true },
  // D'AJUDA
  { id: 'p120', name: 'Barbecue', category: 'molhos', subcategory: "D'Ajuda", brand: "D'Ajuda", price: 30, description: 'Galão 3,6kg', emoji: '🔥', active: true },
  { id: 'p121', name: 'Ketchup', category: 'molhos', subcategory: "D'Ajuda", brand: "D'Ajuda", price: 28, description: 'Galão 3,5kg', emoji: '🍅', active: true },
  { id: 'p122', name: 'Maionese', category: 'molhos', subcategory: "D'Ajuda", brand: "D'Ajuda", price: 28, description: 'Balde 3kg', emoji: '🥫', active: true },
  { id: 'p123', name: 'Maionese', category: 'molhos', subcategory: "D'Ajuda", brand: "D'Ajuda", price: 28, description: 'Bag 3kg', emoji: '🥫', active: true },
  { id: 'p124', name: 'Mostarda', category: 'molhos', subcategory: "D'Ajuda", brand: "D'Ajuda", price: 25, description: 'Galão 3kg', emoji: '🟡', active: true },
  { id: 'p125', name: 'Barbecue', category: 'molhos', subcategory: "D'Ajuda", brand: "D'Ajuda", price: 20, description: '192x7g', emoji: '🔥', active: true },
  { id: 'p126', name: 'Maionese', category: 'molhos', subcategory: "D'Ajuda", brand: "D'Ajuda", price: 16, description: '192x7g', emoji: '🥫', active: true },
  { id: 'p127', name: 'Mostarda', category: 'molhos', subcategory: "D'Ajuda", brand: "D'Ajuda", price: 16, description: '192x7g', emoji: '🟡', active: true },
  { id: 'p128', name: 'Ketchup', category: 'molhos', subcategory: "D'Ajuda", brand: "D'Ajuda", price: 16, description: '192x7g', emoji: '🍅', active: true },
  // PREDILECTA
  { id: 'p129', name: 'Ketchup', category: 'molhos', subcategory: 'Predilecta', brand: 'Predilecta', price: 25, description: 'Galão 3,2kg', emoji: '🍅', active: true },
  { id: 'p130', name: 'Maionese', category: 'molhos', subcategory: 'Predilecta', brand: 'Predilecta', price: 15, description: '144x7g', emoji: '🥫', active: true },
  { id: 'p131', name: 'Mostarda', category: 'molhos', subcategory: 'Predilecta', brand: 'Predilecta', price: 15, description: '144x7g', emoji: '🟡', active: true },
  { id: 'p132', name: 'Barbecue', category: 'molhos', subcategory: 'Predilecta', brand: 'Predilecta', price: 15, description: '144x7g', emoji: '🔥', active: true },
  { id: 'p133', name: 'Ketchup', category: 'molhos', subcategory: 'Predilecta', brand: 'Predilecta', price: 14, description: '144x7g', emoji: '🍅', active: true },
  // BONAPETITE
  { id: 'p134', name: 'Maionese', category: 'molhos', subcategory: 'Bonapetite', brand: 'Bonapetite', price: 35, description: '680x6g', emoji: '🥫', active: true },
  { id: 'p135', name: 'Ketchup', category: 'molhos', subcategory: 'Bonapetite', brand: 'Bonapetite', price: 30, description: '675x6g', emoji: '🍅', active: true },
  // MAREIA
  { id: 'p136', name: 'Maionese', category: 'molhos', subcategory: 'Mareia', brand: 'Mareia', price: 20, description: 'Bag 3kg', emoji: '🥫', active: true },
  { id: 'p137', name: 'Maionese', category: 'molhos', subcategory: 'Mareia', brand: 'Mareia', price: 9, description: '144x6g', emoji: '🥫', active: true },
  { id: 'p138', name: 'Ketchup', category: 'molhos', subcategory: 'Mareia', brand: 'Mareia', price: 9, description: '144x6g', emoji: '🍅', active: true },
  // LANCHERO
  { id: 'p139', name: 'Barbecue', category: 'molhos', subcategory: 'Lanchero', brand: 'Lanchero', price: 28, description: 'Galão 3kg', emoji: '🔥', active: true },
  { id: 'p140', name: 'Maionese', category: 'molhos', subcategory: 'Lanchero', brand: 'Lanchero', price: 20, description: 'Bag 3kg', emoji: '🥫', active: true },
  { id: 'p141', name: 'Mostarda', category: 'molhos', subcategory: 'Lanchero', brand: 'Lanchero', price: 16, description: 'Galão 3kg', emoji: '🟡', active: true },
  { id: 'p142', name: 'Ketchup', category: 'molhos', subcategory: 'Lanchero', brand: 'Lanchero', price: 16, description: 'Galão 3kg', emoji: '🍅', active: true },
  { id: 'p143', name: 'Maionese', category: 'molhos', subcategory: 'Lanchero', brand: 'Lanchero', price: 11, description: '150x5g', emoji: '🥫', active: true },
  { id: 'p144', name: 'Ketchup', category: 'molhos', subcategory: 'Lanchero', brand: 'Lanchero', price: 11, description: '150x5g', emoji: '🍅', active: true },
  // FERMENTO 500g
  { id: 'p145', name: 'Fermento', category: 'conservas', subcategory: 'Fermento 500g', brand: 'Magest', price: 20, description: '500g', emoji: '🍞', active: true },
  // PAPEL ACOPLADO
  { id: 'p146', name: 'Papel Acoplado', category: 'embalagens', subcategory: 'Papel Acoplado', brand: 'Dalpack', price: 42, description: '400fls 40x40', emoji: '📃', active: true },
  { id: 'p147', name: 'Papel Acoplado', category: 'embalagens', subcategory: 'Papel Acoplado', brand: 'Dalpack', price: 32, description: '400fls 30x38', emoji: '📃', active: true },
  // SACO DELIVERY
  { id: 'p148', name: 'Saco Delivery', category: 'embalagens', subcategory: 'Saco Delivery', brand: 'G', price: 28, description: '50un - 15kg', emoji: '🛍️', active: true },
  { id: 'p149', name: 'Saco Delivery', category: 'embalagens', subcategory: 'Saco Delivery', brand: 'M', price: 22, description: '50un - 10kg', emoji: '🛍️', active: true },
  { id: 'p150', name: 'Saco Delivery', category: 'embalagens', subcategory: 'Saco Delivery', brand: 'P', price: 20, description: '50un - 7,5kg', emoji: '🛍️', active: true },
  { id: 'p151', name: 'Saco Delivery', category: 'embalagens', subcategory: 'Saco Delivery', brand: 'PP', price: 18, description: '50un - 5kg', emoji: '🛍️', active: true },
  // HAMBURGUEIRA
  { id: 'p152', name: 'Hamburgueira Reforçada Ultra', category: 'embalagens', subcategory: 'Hamburgueira', brand: 'CH-03 (G)', price: 30, description: 'Branca ou Preta', emoji: '🍔', active: true },
  { id: 'p153', name: 'Hamburgueira Reforçada Ultra', category: 'embalagens', subcategory: 'Hamburgueira', brand: 'CH-02 (M)', price: 30, description: 'Branca ou Preta', emoji: '🍔', active: true },
  { id: 'p154', name: 'Hamburgueira Reforçada Ultra', category: 'embalagens', subcategory: 'Hamburgueira', brand: 'CH-01 (P)', price: 25, description: 'Branca ou Preta', emoji: '🍔', active: true },
  // SACO P/ HAMBÚRGUER
  { id: 'p155', name: 'Saco p/ Hambúrguer', category: 'embalagens', subcategory: 'Saco p/ Hambúrguer', brand: 'Generic', price: 12, description: '500un', emoji: '🍔', active: true },
  // SACO P/ GELADINHO
  { id: 'p156', name: 'Saco p/ Geladinho', category: 'embalagens', subcategory: 'Saco p/ Geladinho', brand: '5x23', price: 12, description: '1.000un', emoji: '🍬', active: true },
  { id: 'p157', name: 'Saco p/ Geladinho', category: 'embalagens', subcategory: 'Saco p/ Geladinho', brand: '4x23', price: 12, description: '1.000un', emoji: '🍬', active: true },
  // LACRE P/ EMBALAGEM
  { id: 'p158', name: 'Lacre p/ Embalagem', category: 'embalagens', subcategory: 'Lacre p/ Embalagem', brand: 'Lanche', price: 0, description: '500un - Consulte', emoji: '🔒', active: true },
  { id: 'p159', name: 'Lacre p/ Embalagem', category: 'embalagens', subcategory: 'Lacre p/ Embalagem', brand: 'Pizza', price: 0, description: '500un - Consulte', emoji: '🔒', active: true },
  // GARRAFA P/ SUCO
  { id: 'p160', name: 'Garrafa p/ Suco', category: 'embalagens', subcategory: 'Garrafa p/ Suco', brand: '1000ml', price: 110, description: '100un', emoji: '🥤', active: true },
  { id: 'p161', name: 'Garrafa p/ Suco', category: 'embalagens', subcategory: 'Garrafa p/ Suco', brand: '500ml', price: 80, description: '100un', emoji: '🥤', active: true },
  { id: 'p162', name: 'Garrafa p/ Suco', category: 'embalagens', subcategory: 'Garrafa p/ Suco', brand: '300ml', price: 70, description: '100un', emoji: '🥤', active: true },
  { id: 'p163', name: 'Garrafa p/ Suco', category: 'embalagens', subcategory: 'Garrafa p/ Suco', brand: '200ml', price: 55, description: '100un', emoji: '🥤', active: true },
  // PAPEL TOALHA
  { id: 'p164', name: 'Papel Toalha', category: 'embalagens', subcategory: 'Papel Toalha', brand: 'Beli Chef', price: 5, description: '100un 21cm (2un)', emoji: '📜', active: true },
  { id: 'p165', name: 'Papel Toalha', category: 'embalagens', subcategory: 'Papel Toalha', brand: 'Maxim', price: 4, description: '100un 20.5cm (2un)', emoji: '📜', active: true },
  // CAIXA DE PIZZA
  { id: 'p166', name: 'Caixa de Pizza', category: 'embalagens', subcategory: 'Caixa de Pizza', brand: '45cm', price: 70, description: 'Tradicional', emoji: '📦', active: true },
  { id: 'p167', name: 'Caixa de Pizza', category: 'embalagens', subcategory: 'Caixa de Pizza', brand: '40cm', price: 65, description: 'Tradicional', emoji: '📦', active: true },
  { id: 'p168', name: 'Caixa de Pizza', category: 'embalagens', subcategory: 'Caixa de Pizza', brand: '35cm', price: 40, description: 'Tradicional', emoji: '📦', active: true },
  { id: 'p169', name: 'Caixa de Pizza', category: 'embalagens', subcategory: 'Caixa de Pizza', brand: '30cm', price: 37, description: 'Tradicional', emoji: '📦', active: true },
  { id: 'p170', name: 'Caixa de Pizza', category: 'embalagens', subcategory: 'Caixa de Pizza', brand: '25cm', price: 32, description: 'Tradicional', emoji: '📦', active: true },
  { id: 'p171', name: 'Caixa de Pizza', category: 'embalagens', subcategory: 'Caixa de Pizza', brand: '20cm', price: 0, description: 'Tradicional - Consulte', emoji: '📦', active: true },
];
