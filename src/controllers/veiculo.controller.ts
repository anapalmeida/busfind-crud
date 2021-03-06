import { Request, Response } from 'express'
import { connect } from '../database'
import { Veiculo } from '../interface/veiculo.interface'

export async function getVeiculos(req: Request, res: Response): Promise<Response> {
  const conn = await connect()
  const veiculos = await conn.query('SELECT * FROM veiculos')
  return res.json(veiculos[0])
}

export async function createVeiculo(req: Request, res: Response) {
  const newVeiculo: Veiculo = req.body
  const conn = await connect()
  conn.query('INSERT INTO veiculos SET ?', [newVeiculo])
  return res.json({
    message: 'O veículos foi criada com sucesso!',
  })
}

export async function getVeiculo(req: Request, res: Response): Promise<Response> {
  const id = req.params.veiculoId
  const conn = await connect()
  const veiculo = await conn.query('SELECT * FROM veiculos WHERE id_veiculo = ?', [id])
  return res.json(veiculo[0])
}

export async function deleteVeiculo(req: Request, res: Response) {
  const id = req.params.veiculoId
  const conn = await connect()
  await conn.query('DELETE FROM veiculos WHERE id_veiculo = ?', [id])
  return res.json({
    message: 'O veículo foi deletado com sucesso!',
  })
}

export async function updateVeiculo(req: Request, res: Response) {
  const id = req.params.veiculoId
  const updateVeiculo: Veiculo = req.body
  const conn = await connect()
  await conn.query('UPDATE veiculos SET ? WHERE id_veiculo = ?', [updateVeiculo, id])
  return res.json({
    message: 'O veículo foi atualizada com sucesso!',
  })
}

export async function getVeiculosByLinha(req: Request, res: Response): Promise<Response> {
  const linha = req.params.linhaId
  const conn = await connect()
  const veiculos = await conn.query('SELECT * FROM veiculos linhas WHERE id_linha_fk = ?', [linha])
  return res.json(veiculos[0])
}