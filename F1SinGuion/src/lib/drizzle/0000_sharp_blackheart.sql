CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`password_hash` text NOT NULL,
	`permission_id` integer,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE TABLE `audit_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`action` text NOT NULL,
	`table` text NOT NULL,
	`record_id` text NOT NULL,
	`changes` text,
	`timestamp` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `circuits` (
	`id` integer PRIMARY KEY NOT NULL,
	`nombre` text NOT NULL,
	`pais` text,
	`ciudad` text,
	`bandera` text,
	`background` text,
	`imagen_circuito` text,
	`info_tecnica` text,
	`resena_historica` text,
	`fecha` text,
	`longitud` text,
	`vueltas` integer,
	`distancia_total` text,
	`record_vuelta` text,
	`primer_gran_premio` integer,
	`numero_curvas` integer,
	`zonas_drs` integer,
	`neumaticos_sugeridos` text,
	`home_driver_ids` text,
	`home_team_ids` text
);
--> statement-breakpoint
CREATE TABLE `drivers` (
	`id` text PRIMARY KEY NOT NULL,
	`team_id` text,
	`nombre` text NOT NULL,
	`apellido` text NOT NULL,
	`numero` integer,
	`pais` text,
	`codigo` text,
	`imagen` text,
	`imagen_casco` text,
	`banner` text,
	`fecha_nacimiento` text,
	`lugar_nacimiento` text,
	`debut` text,
	`equipos_anteriores` text,
	`campeonatos` integer DEFAULT 0,
	`victorias` integer DEFAULT 0,
	`podios` integer DEFAULT 0,
	`poles` integer DEFAULT 0,
	`vueltas_rapidas` integer DEFAULT 0,
	`puntos_historicos` integer DEFAULT 0,
	`posicion` integer DEFAULT 0,
	`puntos` integer DEFAULT 0,
	`victorias_temp` integer DEFAULT 0,
	`instagram` text,
	`twitter` text,
	`redes_sociales` text,
	`resena` text,
	`frase_referencia` text,
	FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `lap_times` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_id` integer,
	`driver_id` text,
	`stint_id` integer,
	`lap` integer NOT NULL,
	`position` integer,
	`time` text,
	`milliseconds` integer,
	`sector_1` text,
	`sector_2` text,
	`sector_3` text,
	`gap_to_leader` text,
	`interval` text,
	`compound` text,
	`tyre_age` integer,
	`is_valid` integer DEFAULT true,
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`driver_id`) REFERENCES `drivers`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`stint_id`) REFERENCES `stints`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `news` (
	`id` text PRIMARY KEY NOT NULL,
	`titulo` text NOT NULL,
	`bajada` text,
	`imagen` text,
	`imagen_pie` text,
	`fecha` text,
	`tags` text,
	`categoria` text,
	`fuente` text,
	`enlace_original` text,
	`tipo` text,
	`estado` text DEFAULT 'publicada',
	`autor` text,
	`tiempo_lectura` integer,
	`visitas` integer DEFAULT 0,
	`archivo_contenido` text,
	`contenido` text,
	`video_url` text,
	`galeria` text
);
--> statement-breakpoint
CREATE TABLE `permissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`role` text,
	`resource` text NOT NULL,
	`action` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` integer PRIMARY KEY NOT NULL,
	`circuit_id` integer,
	`nombre` text,
	`tipo` text,
	`inicio` text,
	FOREIGN KEY (`circuit_id`) REFERENCES `circuits`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `stints` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_id` integer,
	`driver_id` text,
	`stint_number` integer,
	`compound` text,
	`start_lap` integer,
	`end_lap` integer,
	`laps` integer,
	`tyre_age` integer,
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`driver_id`) REFERENCES `drivers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `teams` (
	`id` text PRIMARY KEY NOT NULL,
	`nombre` text NOT NULL,
	`nombre_completo` text,
	`base` text,
	`jefe` text,
	`director_tecnico` text,
	`chasis` text,
	`motor` text,
	`primera_participacion` integer,
	`campeonatos` integer DEFAULT 0,
	`victorias` integer DEFAULT 0,
	`poles` integer DEFAULT 0,
	`vueltas_rapidas` integer DEFAULT 0,
	`color_var` text,
	`logo` text,
	`imagen_coche` text,
	`banner` text,
	`redes_sociales` text,
	`resena` text
);
--> statement-breakpoint
CREATE TABLE `telemetry` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_id` integer,
	`driver_id` text,
	`lap_time_id` integer,
	`timestamp` text,
	`speed` integer,
	`rpm` integer,
	`gear` integer,
	`throttle` integer,
	`brake` integer,
	`drs` integer,
	`aero_mode` text,
	`manual_override` integer,
	`soc` integer,
	`x` integer,
	`y` integer,
	`z` integer,
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`driver_id`) REFERENCES `drivers`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`lap_time_id`) REFERENCES `lap_times`(`id`) ON UPDATE no action ON DELETE no action
);
