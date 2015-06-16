<?php
use Illuminate\Database\Seeder;
use Bancame\User;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder {

    public function run() {
        DB::table('users')->delete();

        $user = new User();
        $user->email = 'admin@gmail.com';
        $user->password = Hash::make('adminadmin');
        $user->username = 'admin';
        $user->admin = TRUE;
        $user->active = TRUE;
        $user->save();

        $user = new User();
        $user->email = 'editor@gmail.com';
        $user->password = Hash::make('editoreditor');
        $user->username = 'editor';
        $user->admin = FALSE;
        $user->editor = TRUE;
        $user->active = TRUE;
        $user->save();

        $user = new User();
        $user->email = 'usuario@gmail.com';
        $user->password = Hash::make('usuarioususuario');
        $user->username = 'usuario';
        $user->admin = FALSE;
        $user->editor = FALSE;
        $user->active = TRUE;
        $user->save();

    }

}

